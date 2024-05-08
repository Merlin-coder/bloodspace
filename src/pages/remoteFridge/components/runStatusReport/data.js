const statusReport = {
    totalUnitsInStock: 86,
    availableUnits: 71,
    assignedUnits: 15,
    available: [
        {
            _id: '611a8111ede051516a94a511',
            name: 'A+',
            count: 16
        },
        {
            _id: '611a8111ede051516a94a512',
            name: 'A-',
            count: 14
        },
        {
            _id: '611a8111ede051516a94a518',
            name: 'AB+',
            count: 8
        },
        {
            _id: '611a8111ede051516a94a51a',
            name: 'AB-',
            count: 6
        },
        {
            _id: '611a8111ede051516a94a517',
            name: 'B+',
            count: 11
        },
        {
            _id: '611a8111ede051516a94a518',
            name: 'B-',
            count: 5
        },
        {
            _id: '611a8111ede051516a94a513',
            name: 'O+',
            count: 11
        },
        {
            _id: '611a8111ede051516a94a514',
            name: 'O-',
            count: 7
        },
        {
            _id: '611a8111ede051516a94a51b',
            name: 'Oh+',
            count: 13
        },
        {
            _id: '611a8111ede051516a94a51c',
            name: 'Oh-',
            count: 1
        }
    ],
    assigned: [
        {
            _id: '611a8111ede051516a94a411',
            name: 'A+',
            count: 2
        },
        {
            _id: '611a8111ede051516a94a412',
            name: 'A-',
            count: 4
        },
        {
            _id: '611a8111ede051516a94a41a',
            name: 'AB-',
            count: 3
        },
        {
            _id: '611a8111ede051516a94a413',
            name: 'O+',
            count: 6
        }
    ],
    expiringIn24Hours: 4,
    expiringIn48Hours: 0,
    expiringIn72Hours: 1,
    edqCount: 1,
    edqData: {
        expiredUnit: [
            {
                _id: '6206707bebd09c0e90447e7f',
                rfidNumber: 'e005400112485f4a',
                rfidData: 'rfid Data',
                donationCode: 'R96862187165449',
                collectionDateAndTime: '2021-01-25T02:30:00.000Z',
                expiryDateAndTime: '2022-02-23T01:00:00.000Z',
                expirySchedule: '0 8 5 5 4',
                dimensions: null,
                bloodgroupId: '611a8111ede051516a94a51b',
                productcodeId: '611a8111ede051516a94a4e3',
                productgroupId: '611a8111ede051516a94a4c9',
                specialtestingId: '6206707bebd09c0e90447e7e',
                devicTrackId: null,
                isActive: 1,
                isAssigned: 0,
                clientId: '611a810fede051516a94a49b',
                locationId: '611a8110ede051516a94a4a6',
                deviceId: '61309fb567be2141b7b06990',
                trackId: '611a8111ede051516a94a528',
                transferStatus: 'Available',
                code: 'BS-2ec87458-bb05-4c2c-90eb-da42be50fe4c-10',
                createdBy: '612dfbb7ea986e727df1c153',
                updatedBy: '612dfbb7ea986e727df1c153',
                createdAt: '2022-02-11T14:19:39.199Z',
                updatedAt: '2022-02-23T13:05:32.677Z',
                isSync: false,
                authorityId: '611a810fede051516a94a499',
                deviceTrackId: '611a8111ede051516a94a522',
                drawerNo: '0',
                isLedTriggered: 0,
                sentBy: '192.168.56.1:5011',
                phenotypeResult: 'K-;s-;Lua-;Kpa-;Jk(a+b+);Dob+;Ina-;Cob-;Dia-;C*+',
                testnumber: '939919499824320000'
            }
        ],
        quarantinedUnit: [],
        dereservedUnit: [],
        dereservedBatches: [],
        expiredBatches: [],
        quarantinedBatches: []
    }
};

export default statusReport;
