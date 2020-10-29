var groupBy = require('group-by');

const datasource = [
    {
        "YYYY": "2020",
        "MM": "11",
        "VENDER_CODE": "VK-00071-00",
        "VENDER_NAME": "นาย ก รักไทย",
        "PRODUCT_CODE": "PAY",
        "VENDER_BANKACC": "2062019657",
        "NET_PAID_AMT": 400.50
    },
    {
        "YYYY": "2020",
        "MM": "11",
        "VENDER_CODE": "VK-00071-00",
        "VENDER_NAME": "นาย ข รักไทย",
        "PRODUCT_CODE": "PAY",
        "VENDER_BANKACC": "2062019657",
        "NET_PAID_AMT": 400.00
    },
    {
        "YYYY": "2020",
        "MM": "11",
        "VENDER_CODE": "VK-00072-00",
        "VENDER_NAME": "นาย ข รักไทย",
        "PRODUCT_CODE": "PA4",
        "VENDER_BANKACC": "02370553014",
        "NET_PAID_AMT": 1428.80
    }
];

exports.connect = (req, res) => {
    res.jsonp({
        status: 200,
        data: "Connect Success!!"
    });
}

exports.extract = (req, res, next) => {
    req.datasource = datasource;
    next();
}

exports.transform = (req, res, next) => {
    const byName = groupBy(datasource.filter(it => it.PRODUCT_CODE), it => it['PRODUCT_CODE'])
    // console.log(byName);

    const output = Object.keys(byName).map(PRODUCT_CODE => {
        const count = groupBy(byName[PRODUCT_CODE], it => it.VENDER_NAME);
        const sum = byName[PRODUCT_CODE].reduce((acc, it) => acc + it.NET_PAID_AMT, 0);
        return {
            Product: PRODUCT_CODE,
            Count: Object.keys(count).length,
            ValueSum: sum
        }
    })
    console.log(byName);
    console.log(output);

    
    // const dataset = req.body;
    // dataset.rows.forEach(row => {
    //     row.fields.forEach(field => {
    //         switch (field.fieldtype) {
    //             case "Data Field":
    //                 field.example = field.datafieldname;
    //                 // console.log("Data Field");
    //                 break;
    //             case "Text Field":
    //                 field.example = field.fixfieldname;
    //                 // console.log("Text Field");
    //                 break;
    //         }
    //     })
    // });
    // req.body = dataset;
    next();
}

exports.load = (req, res, next) => {
    res.jsonp({
        status: 200,
        data: req.body
    });
}

// exports.response = (req, res) => {

// }
