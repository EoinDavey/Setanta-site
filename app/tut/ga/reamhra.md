---
title: Réamhrá Teagaisc
---

# Fáilte!

**Fáilte go dtí an Teagasc Setanta**.

Tá súil againn go bhfuil tú réidh chun foghlaim gach rud faoi [[ríomhchlárúchán|programming]], agus conas a oibríonn é agus an Ghaeilge le chéile.

Níl ach cúpla rudaí le míniú sula mbeidh tú réidh le tosú.

## Aistriúcháin

Má fheiceann tú focal le folíne mar [[seo|D'aimsigh tú mé!]], is focal é le
[[aistriúchán|translation]].
Cuir do luch thar an focal nó cliceáil air chun a aistriúchán a fheiceáil. [[Bain triail as!|Try it out!]]

## Eagarthóirí Setanta

Ar fud an teagasc seo, aimseoidh tú eagarthóirí Setanta mar seo:

{{{
>-- Is eagarthóir Setanta é seo
scríobh("Dia duit!")
}}}

Is féidir linn eagarthóirí a úsáid chun ríomhchláir Setanta a scríobh. Clóscríobhaimid ríomhchlár
isteach sa bosca ar chlé agus brúimid <iron-icon class="play" icon="av:play-arrow"></iron-icon> chun
é a tosú. Beidh torthaí an ríomhchláir le feiceáil ar dheis.

Brúigh an cnaipe <iron-icon class="play" icon="av:play-arrow"></iron-icon> chun an cód san
eagarthóir a rith.
Bá chóir go bhfuil "Dia duit!" scríofa ar an taobh dheis.

## An Consól

Ar an taobh dheis, ba chóir go bhfuil seo le feiceáil:

> Dia Duit!

Is é seo an consól. Is féidir linn an consól a úsáid chun teachtaireachtaí a léamh agus a scríobh.
Sa ríomhchlár roimhe (`scríobh("Dia duit!")`), d'úsáideamar an gníomh `scríobh` chun "Dia duit!" a
scríobh amach ar an gconsól.

Freisin, is féidir linn an consól a úsáid chun teachtaireachtaí a sheoladh chuig an ríomhchlár. Bain
triail as an gcéad ríomhchlár eile seo a rith; Ba chóir go scríobhfadh sé "Cad is ainm duit?" sa
chonsól. Chlóscríobh d'ainm isteach sá bosca téacs ag an bun agus brúigh an eochair iontrála.

{{{
ainm := ceist("Cad is ainm duit?")
scríobh("Dia duit", ainm)
}}}

Brúigh an <iron-icon class="clear" icon="icons:clear"></iron-icon> chun an consól a ghlanadh.

### Taispeántas

![Ag scríobh d'ainm](../en/assets/intro-name.gif)

## An Stáitse

Tá dhá táib i ngach eagarthóir, agus is féidir leat athraigh eatarthu. Taispeánann ceann amháin an
consól, agus taispeánann ceann eile an stáitse.

Is féidir linn an stáitse a úsáid le Setanta chun pictiúir nó beochain a tharraing, agus fiú cluichí
a chruthú!

Rith an ríomhchlár a leanas, agus ansin cliceáil ar an táb "Stáitse/Stage" chun an stáitse a
fheiceáil.

{{{
dath@stáitse("dearg")
ciorcal@stáitse(200, 200, 100)
}}}

Ba chóir go bhfuil ciorcal dearg le fheiceáil.

![Ciorcal Dearg](../en/assets/circle-red.gif)

<!-- TODO(#11) Support try-setanta.ie/eagarthoir -->
# try-setanta.ie/editor

Is leaganacha beaga den phríomh-eagarthóir ar try-setanta.ie iad na eagarthóirí atáimid ag
úsáid sa teagasc seo. Más mhaith leat triail a bhaint as do chód ar scáileán níos mó, nó do chód a
shábháil agus a roinn le daoine eile, ba chóir duit dul go
[try-setanta.ie/editor](https://try-setanta.ie/editor) agus bain triail as an príomh-eagarthóir.

# Tosaímis!

Anois tá a fhios agat conas na heagarthóirí agus na haistriúcháin a úsáid, is féidir linn tosaigh ag
foghlaim Setanta. Bog go dtí an céad roinn eile leis an cnaipe "Céad leathanach eile" sa painéal
"Clár", nó leis an cnaipe ag bun an leathanaigh.
