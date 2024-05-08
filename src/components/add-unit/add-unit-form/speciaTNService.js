export function getPhenotypeReport(specialTestingNumber) {
    let pos = [
        'Rh*',
        'K k',
        'Cw MiaвЂ',
        'M N',
        'S s',
        'U P1',
        'Lua Kpa',
        'Lea Leb',
        'Fya Fyb',
        'Jka Jkb',
        'Doa Dob',
        'Ina Cob',
        'Dia VS/V',
        'Jsa C*',
        'c* E*',
        'e* CMV'
    ];
    let values = [
        [
            'C+c-E+e-',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt',
            'nt nt'
        ],
        [
            'C+c+E+e-',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -',
            'nt -'
        ],
        [
            'C-c+E+e-',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +',
            'nt +'
        ],
        [
            'C+c-E+e+',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt',
            '- nt'
        ],
        [
            'C+c+E+e+',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -',
            '- -'
        ],
        [
            'C-c+E+e+',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +',
            '- +'
        ],
        [
            'C+c-E-e+',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt',
            '+ nt'
        ],
        [
            'C+c+E-e+',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -',
            '+ -'
        ],
        [
            'C-c+E-e+',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +',
            '+ +'
        ],
        [
            'ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni',
            'ni ni'
        ]
    ];
    let mExtra = [
        'Ena',
        '‘N’',
        'Vw',
        'Mur*',
        'Hut',
        'Hil',
        'P',
        'PP1Pk',
        'hrS',
        'hrB',
        'f',
        'Ce',
        'G',
        'Hr0',
        'CE',
        'cE',
        'Cx',
        'Ew',
        'Dw',
        'hrH',
        'Goa',
        'Rh32',
        'Rh33',
        'Tar',
        'b',
        'Kpc',
        'Jsb',
        'Ula',
        'K11',
        'K12',
        'K13',
        'K14',
        'K17',
        'K18',
        'K19',
        'K22',
        'K23',
        'K24',
        'Lub',
        'Lu3',
        'Lu4',
        'Lu5',
        'Lu6',
        'Lu7',
        'Lu8',
        'Lu11',
        'Lu12',
        'Lu13',
        'Lu20',
        'a',
        'Aub',
        'Fy4',
        'Fy5',
        'Fy6',
        'Dib',
        'Sda',
        'Wrb',
        'Ytb',
        'Xga',
        'Sc1',
        'Sc2',
        'Sc3',
        'Joa',
        'removed',
        'Hy',
        'Gya',
        'Co3',
        'LWa',
        'LWb',
        'Kx',
        'Ge2#',
        'Ge3#',
        'Wb',
        'Lsa',
        'a',
        'Dha',
        'Cra',
        'IFC',
        'Kna',
        'Inb',
        'Csa',
        'I',
        'Era',
        'Vel',
        'Lan',
        'Ata',
        'Jra',
        'Oka',
        'Wra',
        'reserved',
        'reserved',
        'reserved',
        'reserved',
        'reserved',
        'reserved',
        'Hgb S Neg.',
        'parvovirus B19 antibody present',
        'IgA deficient#',
        ''
    ];
    if (specialTestingNumber?.length < 18) {
        return 'Invalid Special Testing Number';
    }
    // console.log("specialTestingNumber: ", specialTestingNumber)
    let mLast = parseInt(specialTestingNumber?.substring(specialTestingNumber.length - 2));
    let lastTwoReport = mExtra[mLast - 1];
    let data = specialTestingNumber?.substring(0, specialTestingNumber.length - 2);
    let result = [];
    for (let i = 0; i < data.length - 1; i++) {
        let antigen = pos[i];
        let dataValue = values[data.charAt(i)]?.[i];
        if (i > 0 && antigen !== undefined && dataValue !== undefined) {
            let antArray = antigen.split(' ');
            let dValueArray = dataValue.split(' ');
            let m = '';
            if (dValueArray[0] !== 'ni' && dValueArray[0] !== 'nt') {
                m = antArray[0] + '' + dValueArray[0];
            }
            if (dValueArray[1] !== 'ni' && dValueArray[1] !== 'nt') {
                m = m + ' ' + antArray[1] + dValueArray[1];
            }
            if (m.length > 0) {
                const array2 = ['Fy', 'Le', 'Jk', 'Do'];
                let re = m.substring(0, 2);
                if (array2.includes(re) && m.includes(' ')) {
                    let f = m.split(' ');
                    let dat = f[0].substring(f[0].length, f[0].length - 2);
                    let dat1 = f[1].substring(f[1].length, f[1].length - 2);
                    m = `${re}(${dat}${dat1})`;
                }
                result.push(m);
            }
        } else {
            if (dataValue !== 'ni' && dataValue !== 'nt') result.push(dataValue);
        }
    }
    let mData = replaceAll(result.toString(), ',', ';');
    mData = replaceAll(mData, ' ', ';');
    mData = replaceAll(mData, ';;', ';');
    let finalResult = mData;
    if (lastTwoReport?.length > 0) {
        finalResult = finalResult + ';' + lastTwoReport;
    }
    // console.log("Phenotype result: " + finalResult)
    return finalResult;

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}
