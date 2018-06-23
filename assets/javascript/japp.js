// single example
$.post(
  'https://apiv2.indico.io/emotion',
  JSON.stringify({
    'api_key': "52ab40ad3535532ada2f2b567ddb900e",
    'data': "I did it. I got into Grad School. Not just any program, but a GREAT program. :-)",
    'threshold': 0.1
  })
).then(function(res) { console.log(res) });

// batch example
$.post(
  'https://apiv2.indico.io/emotion/batch',
  JSON.stringify({
    'api_key': "52ab40ad3535532ada2f2b567ddb900e",
    'data': ["I did it. I got into Grad School. Not just any program, but a GREAT program. :-)", "Like seriously my life is bleak, I have been unemployed for almost a year."],
    'threshold': 0.1
  })
).then(function(res) { console.log(res) });