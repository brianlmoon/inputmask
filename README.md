# inputmask.js
**A vanilla, micro javascript library for masking inputs**

inputmask.js masks input on HTML input elements using a regular expression. Set the `data-mask` attribute on the `input` element and call:
```
new inputMask(document.getElementById("input-id"));
```

Or, to quickly add it to all the masked inputs, you could use:
```
var maskedInputs = document.selectorQuery("input[data-mask]");
for(var x = 0; x < maskedInputs.length; x++) {
   new inputMask(maskedInputs[x]);
}
```

## Choosing a pattern

One thing to keep in mind is that you can't be too restrictive with your patterns. For example, `^\d+a` would not allow the user to enter a digit because the pattern requires the `a` to be present. You will want to use something like `^\d+a?` which would allow for zero or more `a` after one or more digits.

Having built in, named mask patterns would be nice to have. Pull requests welcome. =)