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

One thing to keep in mind is that you can't be too restrictive with your patterns.

For example, let's say you want to mask a YYYY-MM-DD date. `^\d{1,4}-\d{1,2}-\d{1,2}$` would match a full date string, however it would not allow the user to type because the the whole regex has to match. You will want to use something like this instead:
```
^(\d{1,4}|\d{1,4}-|\d{1,4}-[0-1]|\d{1,4}-[0-1]\d|\d{1,4}-[0-1]\d-|\d{1,4}-[0-1]\d-[0-3]|\d{1,4}-[0-1]\d-[0-3]\d)?$
```
This allows the user to type the start of the date, without having the entire date. This looks like a complex regex. But, really, it's just the final regex `\d{1,4}-[0-1]\d-[0-3]\d` broken down into it's parts that allows the user to type. This is not a perfect example either. It would allow 9999-19-35, which is not a date. But, it will get you most of the way there.

If you wanted to be more liberal with the date regex, you could always use `^[\d\-]{1,9}$`. This would allow the user to enter only digits and the dash. It just depends on how restrictive you want to be.

Having built in, named mask patterns would be nice to have. Pull requests welcome. =)