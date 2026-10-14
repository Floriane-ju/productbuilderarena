# Agrège les données client en src/data.json (python3 scripts/build_data.py)
import json, csv, collections
D = json.load(open('dataset_client_claire_martin.json'))
P = D['parametres']; F = P['fourniture']
HP, HC = F['prix_kwh_hp_eur'], F['prix_kwh_hc_eur']
CAP = D['client']['services'][0]['capacite_kwh']
J = D['journalier']; JD = {x['date']: x for x in J}
rows = list(csv.DictReader(open('courbe_15min_2026.csv')))
fl = lambda r, k: float(r[k])

# --- 15 min, partie 2026 de l'année d'anniversaire : simulation exacte (vérifiée contre le journalier)
def sim(steps, cap, lvl, shift=None):
    out = collections.Counter()
    for r in steps:
        pr = HC if r['plage_tarifaire'] == 'HC' else HP
        p, c = fl(r, 'production_kwh'), fl(r, 'conso_totale_kwh')
        if shift: c += shift.get(r['horodatage'], 0)
        a = min(p, c); s = p - a; b = c - a
        st = min(s, cap - lvl); lvl += st
        de = min(b, lvl); lvl -= de
        out['auto'] += a; out['de'] += de; out['imp'] += b - de; out['lost'] += s - st
        out['eur_auto'] += a * pr; out['eur_de'] += de * pr; out['eur_imp'] += (b - de) * pr
        out['de_HC'] += de if pr == HC else 0
    return out, lvl

y26 = [r for r in rows if r['horodatage'][:10] <= '2026-10-14']
proxy25 = [r for r in rows if r['horodatage'][:10] >= '2026-10-15']  # même saison, sert d'estimation pour oct-déc 2025
lvl0 = D['niveau_batterie_depart_kwh']
lvl_dec = JD['2025-12-31']['niveau_batterie_fin_jour_kwh']
base26, _ = sim(y26, CAP, lvl_dec)

J25 = [x for x in J if x['date'] < '2026-01-01']
s25 = lambda k: sum(x[k] for x in J25)
# part HC du déstockage oct-déc : estimée sur la même saison de la courbe
pr25, _ = sim(proxy25, CAP, lvl0)
hc_share25 = pr25['de_HC'] / pr25['de']
eur_auto = base26['eur_auto'] + s25('autoconso_directe_kwh') * HP  # pas de soleil en HC (22h30-6h30)
eur_de = base26['eur_de'] + s25('destocke_kwh') * (hc_share25 * HC + (1 - hc_share25) * HP)
abo = D['client']['services'][0]['abonnement_mensuel_eur'] * 12
contrib = P['commun_stockage']['contribution_autoproducteur_eur_an']
gain = eur_auto + eur_de - abo - contrib

S = lambda k: sum(x[k] for x in J)
conso, prod = S('conso_totale_kwh'), S('production_kwh')
auto, de = S('autoconso_directe_kwh'), S('destocke_kwh')

# jours sans réseau
streak = best = 0; bstart = bend = None; cs = None
for x in J:
    if x['import_reseau_kwh'] == 0:
        if streak == 0: cs = x['date']
        streak += 1
        if streak > best: best, bstart, bend = streak, cs, x['date']
    else: streak = 0

# équipements : part couverte par le soleil (15 min exact sur 2026, ratio journalier sur 2025)
eq = {'conso_electromenager_deplacable_kwh': 'Lave-linge', 'conso_ballon_kwh': "Ballon d'eau chaude", 'conso_pac_kwh': 'Pompe à chaleur'}
freek = collections.Counter(); totk = collections.Counter()
lvl = lvl_dec
for r in y26:
    p, c = fl(r, 'production_kwh'), fl(r, 'conso_totale_kwh')
    a = min(p, c); s = p - a; b = c - a
    lvl += min(s, CAP - lvl); de_ = min(b, lvl); lvl -= de_
    cov = (a + de_) / c if c else 0
    for k in eq:
        col = k.replace('conso_electromenager_deplacable_kwh', 'conso_electromenager_deplacable_kwh')
        v = fl(r, col); freek[k] += v * cov; totk[k] += v
for x in J25:
    cov = (x['autoconso_directe_kwh'] + x['destocke_kwh']) / x['conso_totale_kwh']
    for k in eq: freek[k] += x[k] * cov; totk[k] += x[k]
equip = [{'name': eq[k], 'kwh': round(totk[k]), 'free_kwh': round(freek[k]), 'pct': round(100 * freek[k] / totk[k])} for k in eq]

# --- leviers année 2 (estimations sur année 15 min reconstituée : proxy oct-déc + 2026 réel)
year = proxy25 + y26
def gain_of(cap, shift=None):
    o, _ = sim(year, cap, lvl0, shift)
    return o['eur_auto'] + o['eur_de'], o
g100, o100 = gain_of(100)
# levier capacité : meilleure capacité MSB
caps = P['msb']['abonnement_mensuel_eur_par_capacite_kwh']
best_cap = None
for c, m in caps.items():
    g, o = gain_of(int(c))
    net = g - m * 12 - (g100 - abo)
    if best_cap is None or net > best_cap['eur']: best_cap = {'cap': int(c), 'eur': net, 'monthly': m, 'extra_de': o['de'] - o100['de']}
# levier ballon : chauffe déplacée aux 3 h les plus ensoleillées, les jours où le surplus suffit
byday = collections.defaultdict(list)
for r in year: byday[r['horodatage'][:10]].append(r)
shift = {}
for d, rs in byday.items():
    dep = sum(fl(r, 'conso_ballon_kwh') for r in rs)
    if dep == 0 or sum(fl(r, 'surplus_injecte_kwh') for r in rs) < dep: continue
    for r in rs: shift[r['horodatage']] = shift.get(r['horodatage'], 0) - fl(r, 'conso_ballon_kwh')
    tg = sorted(rs, key=lambda r: -fl(r, 'surplus_injecte_kwh'))[:12]
    for r in tg: shift[r['horodatage']] += dep / len(tg)
gs, os_ = gain_of(100, shift)
lev_shift = gs - g100
msp = P['msp_cagnotte']['eur_par_kwh'] * (S('conso_pac_kwh') + S('conso_ballon_kwh'))

levers = sorted([
    {'id': 'msp', 'title': 'Activer MySmartPilot', 'desc': f"Option gratuite : {P['msp_cagnotte']['eur_par_kwh']*100:.0f} centimes par kWh de votre pompe à chaleur et de votre ballon, versés dans votre cagnotte.", 'eur': round(msp), 'basis': f"{round(S('conso_pac_kwh') + S('conso_ballon_kwh'))} kWh × 0,05 €"},
    {'id': 'cap', 'title': f"Passer à {best_cap['cap']} kWh de batterie", 'desc': (f"Cet été, {round(S('surplus_perdu_kwh'))} kWh n'ont pas trouvé de place. Une batterie plus grande les garde pour l'automne." if best_cap['cap'] > CAP else f"Hors été, votre batterie se vide vite : {best_cap['cap']} kWh couvrent l'essentiel, pour un abonnement plus léger."), 'eur': round(best_cap['eur']), 'basis': f"{'+' if best_cap['extra_de'] >= 0 else '−'}{abs(round(best_cap['extra_de']))} kWh restitués, abonnement {str(best_cap['monthly']).replace('.', ',')} €/mois inclus", 'cap': best_cap['cap']},
    {'id': 'shift', 'title': "Chauffer l'eau au soleil", 'desc': "Les jours où le soleil suffit, votre ballon chauffe en milieu de journée plutôt qu'à 22h30. La nuit, votre batterie reste pleine pour le lendemain.", 'eur': round(lev_shift), 'basis': f"{round(sum(-v for v in shift.values() if v < 0))} kWh de chauffe déplacés"},
], key=lambda l: -l['eur'])

prices2 = {'hp': F['prix_kwh_hp_apres_12_mois_eur'], 'hc': F['prix_kwh_hc_apres_12_mois_eur']}

co2 = prod * P['co2_kg_par_kwh_reseau']
out = {
    'client': {'prenom': D['client']['prenom'], 'ville': D['client']['ville'], 'since': D['client']['client_depuis'], 'anniv': D['client']['date_anniversaire'], 'kwc': D['client']['puissance_installee_kwc'], 'cap': CAP},
    'conso': round(conso), 'prod': round(prod), 'auto': round(auto), 'destocke': round(de), 'import': round(S('import_reseau_kwh')),
    'solarShare': round(100 * (auto + de) / conso),
    'ticket': [
        {'label': 'Soleil consommé en direct', 'kwh': round(auto), 'eur': round(eur_auto, 2), 'detail': f"{round(auto)} kWh produits et utilisés à l'instant même, payés 0 € au lieu de {str(HP).replace('.', ',')} € le kWh."},
        {'label': 'Restitué par votre batterie virtuelle', 'kwh': round(de), 'eur': round(eur_de, 2), 'detail': f"{round(de)} kWh mis de côté le jour et repris le soir ou l'hiver, sans les racheter."},
        {'label': 'Abonnement MySmartBattery', 'kwh': None, 'eur': -round(abo, 2), 'detail': f"12 mois × {str(D['client']['services'][0]['abonnement_mensuel_eur']).replace('.', ',')} € pour {CAP} kWh de capacité."},
        {'label': 'Contribution autoproducteur', 'kwh': None, 'eur': -round(contrib, 2), 'detail': 'Frais réglementaire annuel lié au stockage virtuel.'},
    ],
    'gain': round(gain),
    'equip': equip,
    'noGrid': {'days': sum(1 for x in J if x['import_reseau_kwh'] == 0), 'streak': best, 'from': bstart, 'to': bend},
    'battery': {'fullDays': sum(m['jours_batterie_pleine'] for m in D['mensuel']), 'cycles': round(de / CAP, 1), 'stored': round(S('stocke_kwh')), 'lost': round(S('surplus_perdu_kwh'))},
    'co2': {'kg': round(co2), 'km': round(co2 / P['co2_kg_par_km_voiture']), 'trees': round(co2 / P['co2_kg_absorbe_par_arbre_an'])},
    'levers': levers,
    'prices': {'hp': HP, 'hc': HC, 'hp2': prices2['hp'], 'hc2': prices2['hc']},
    'days': [[x['date'], round(x['production_kwh'], 2), round(x['conso_totale_kwh'], 2), round(x['niveau_batterie_fin_jour_kwh'], 2), round(x['import_reseau_kwh'], 2), round(x['stocke_kwh'], 2), round(x['destocke_kwh'], 2), round(x['surplus_perdu_kwh'], 2)] for x in J],
    'months': [[m['mois'], m['production_kwh'], m['conso_totale_kwh'], m['jours_batterie_pleine']] for m in D['mensuel']],
}
# projection année 2 : mêmes flux valorisés aux prix année 2 (part HC du déstockage connue / estimée)
de_hc = base26['de_HC'] + s25('destocke_kwh') * hc_share25
eur2 = auto * prices2['hp'] + de_hc * prices2['hc'] + (de - de_hc) * prices2['hp']
out['proj'] = {'sameFlowsY2': round(eur2 - abo - contrib)}
json.dump(out, open('src/data.json', 'w'), ensure_ascii=False)
print(json.dumps({k: v for k, v in out.items() if k not in ('days', 'months')}, ensure_ascii=False, indent=1))
print('hc_share25', hc_share25, 'baseline sim year gain', g100 - abo - contrib)

