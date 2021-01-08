# Создание заявки на генерирование отчёта:

Отправить POST на адрес /report/{type}/{template}/ и данными для построения отчёта в произвольном формате (json, csv)

1. type - определяет вид отчёта, доступно: web
2. template - определение шаблона отчёта
2.1. для web-отчётов будет открыт сайт с адресом {http://WEBREPORT_URL}/{template}/{uuid} и на его основе сформирован pdf.

`curl --location --request POST 'http://localhost/report/web/msks/' --header 'Content-Type: text/plain' --data '@example-msks.csv'`

`{"uuid":"2c96808376e1406d0176e184aae40002"}`

# Получение данных для отчёта (используется в web-приложении):

`curl --location --request GET 'http://localhost/report/blob/2c96808376e1406d0176e184aae40002'`

# Проверка статуса отчёта:

`curl --location --request GET 'http://localhost/report/status/2c96808376e1406d0176e184aae40002'`

`{"uuid":"2c96808376e1406d0176e184aae40002","status":"Done","file":"http://localhost/files/2c96808376e1406d0176e184aae40002.pdf","errorMsg":null}`
