---
title: An Stáitse
prev: cad-e-riomhchlaru
prev-text: Cad é Ríomhchlárú?
---

# Gníomhartha

Le tosú ag tarraingt cruthanna ar an stáitse, is gá dúinn féach ar **gníomhartha**.

Chonaiceamar cúpla gníomhartha cheana, ba gníomh é `scríobh`{.setanta}, chomh maith le
`codladh`{.setanta}.

Is luachanna speisialta iad gníomhartha a sheasann do rudaí casta is féidir leis an ríomhaire a
dhéanamh. Sa chás `gníomh`{.setanta} mar shampla, is é an rud casta téacs a scríobh ar an gconsól
agus sa chás `codladh`{.setanta}, is é ag fanacht ar feadh am éigin.

Amach anseo, feicfimid conas ár ngníomhartha féin a chruthú, ach anois feicfimid ar an caoi is
féidir linn iad a úsáid.

## Glaoigh Orm!

Nuair a bainimid úsáid as gníomh, deirimid go bhfuilimid **ag glaoch** air. An cuimhin leat an caoi
a d'úsáideamar an gníomh `scríobh`{.setanta}?

```{.setanta .numberLines}
scríobh("Scríobh mé ar an gconsól")
```

Nuair a léann léirmhínitheoir *Setanta* "`scríobh("Scríobh mé ar an gconsól")`{.setanta}", glaonn sé
ar an gníomh `scríobh`{.setanta} agus tugann sé an téacs `"Scríobh mé ar an gconsól"`{.setanta} dó.

Tugaimid "**argóint**" ar an téacs idir na lúibíní. Sa chód thuas, is é
`"Scríobh mé ar an gconsól"`{.setanta} an argóint do `scríobh`{.setanta}

Sa chód a leanas, ba `2000`{.setanta} an argóint do `codladh`{.setanta}.

```{.setanta .numberLines}
codladh(2000)
```

Nuair a ritear an cód seo, tugann an ríomhaire `2000`{.setanta} don gníomh `codladh`{.setanta} agus
ansin glaonn sé air. Ansin fanann an léirmhínitheoir ar feadh dhá soicind.

### Níos mó argóintí

Is féidir le roinnt gníomhartha i *Setanta* níos mó ná argóint amháin a ghlacadh. Nuair a tugaimid
níos mó ná argóint amháin do gníomh éigin, bainimid úsáid as camóg ("`,`") chun iad a scaradh.

Mar shampla, is féidir le `scríobh`{.setanta} an oiread argóintí agus is mian linn a ghlacadh, agus
scríobhfaidh sé gach ceann ar an gconsól le spás eatarthu. Bain triail as anseo:

{{{
scríobh("An-chéad-argóint", "An-dara-argóint")
}}}

Ní féidir le gach gníomh an oiread argóintí agus is mian linn a ghlacadh. Glacann an gníomh le
argóint amháin, ní ghlacann sé le aon méid argóinte eile.

Is féidir le roinnt argóintí 0 argóintí a ghlacadh.

## Dúshlán

Anois triailimis ár n-eolas ar gníomhartha!

Seo cód a úsáideann `scríobh`{.setanta} chun "Is aoibhinn liom Setanta!" a scríobh. Athraigh an cód
ionas go fós scríobhann sé "Is aoibhinn liom Setanta!" ach baineann sé úsáid as ceithre athróg ina
ionad sin.

{{{
scríobh("Is aoibhinn liom Setanta!")
}}}

[[Cliceáil anseo le haghaidh an freagra|scríobh(&quot;Is&quot;, &quot;aoibhinn&quot;, &quot;liom&quot;, &quot;Setanta!&quot;)]]

## Torthaí

Nuair a glaoitear ar roinnt gníomhartha i *Setanta* tugann siad luach éigin ar ais. Tugaimid "toradh
an ghnímh" ar an luach sin.

Seo sampla beag chun a bheith níos soiléire: Tá gníomh `uas`{.setanta} ag *Setanta*. Is giorrúchán é
`uas`{.setanta} ar "uasmhéid".

Cad a dhéanann `uas`?. Glacann `uas` le dhá uimhir agus tugann sé ar ais an ceann is mó.

Mar shampla: Is é `3`{.setanta} toradh an tsloinn `uas(3, 2)`{.setanta}.

Is féidir linn toradh ghnímh a chur in athróg, mar seo:

```
is_mó := uas(3, 2)
```

Sa chás seo, ba é `3`{.setanta} luach an athróg `is_mó`. Bain triail as:

{{{
is_mó := uas(3, 2)
scríobh(is_mó)
}}}

Bain triail as luachanna difriúil, mar shampla, cad a scríobhfadh an cód dá gcuirfeá
`uas(100, 200)`{.setanta} in ionad `uas(3, 2)`{.setanta}.

*Tabhair faoi deara go féidir linn `scríobh(uas(3, 2)){.setanta} a scríobh, ag úsáid toradh
`uas`{.setanta} díreach mar argóint `scríobh`{.setanta}*.
