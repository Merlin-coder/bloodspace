export const dummyData = {
    sessionData: {
        total: [
            '621374248c9c2a1cec8a42e3',
            '621374078c9c2a1cec8a42dd',
            '6213743e8c9c2a1cec8a42e9',
            '6213745a8c9c2a1cec8a42ef',
            '61ec0cf4c186b54f8c84aa0f',
            '61ec0cf4c186b54f8c84aa0f',
            '61ec0cf4c186b54f8c84aa0f'
        ],
        good: [],
        isActive: 1,
        isSync: false,
        _id: '61f39fecd6847a08646359ec',
        startTime: '2022-01-28T07:48:59.998Z',
        deviceId: '61cd2c7b0c7762282c06183f',
        unlockDoorCount: 0,
        startSessionUserId: '61a702595494b668be8203f3',
        type: 'Bulk Load',
        status: 'Open',
        faulty: [
            {
                _id: '6214a437eb43e31190a1baaf',
                refSku: '621374248c9c2a1cec8a42e3',
                error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
            },
            {
                _id: '6214a437eb43e31190a1bab0',
                refSku: '621374078c9c2a1cec8a42dd',
                error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
            },
            {
                _id: '6214a437eb43e31190a1bab1',
                refSku: '6213743e8c9c2a1cec8a42e9',
                error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
            },
            {
                _id: '6214a437eb43e31190a1bab2',
                refSku: '6213745a8c9c2a1cec8a42ef',
                error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
            }
        ],
        createdAt: '2022-01-28T07:49:00.014Z',
        updatedAt: '2022-02-22T08:52:07.704Z',
        __v: 0,
        endTime: null,
        faultyBatch: [
            {
                _id: '6214a437eb43e31190a1bab3',
                batch: '61ec0cf4c186b54f8c84aa0f',
                error: 'Batch with gtin 21006426210249, The device Device 3 Cannot hold product beta'
            },
            {
                _id: '6214a437eb43e31190a1bab4',
                batch: '61ec0cf4c186b54f8c84aa0f',
                error: 'Batch with gtin 21006426210249, The device Device 3 Cannot hold product beta'
            },
            {
                _id: '6214a437eb43e31190a1bab5',
                batch: '61ec0cf4c186b54f8c84aa0f',
                error: 'Batch with gtin 21006426210249, The device Device 3 Cannot hold product beta'
            }
        ],
        goodBatch: [],
        session: 'error'
    },
    goodData: [
        {
            refSku: {
                _id: '6213745a8c9c2a1cec8a42ef',
                rfidNumber: 'R98765434567655',
                rfidData: 'rfid Data',
                donationCode: 'R98765434567655',
                collectionDateAndTime: '1970-01-01T00:00:00.000Z',
                expiryDateAndTime: '2022-02-28T14:15:00.000Z',
                expirySchedule: '45 19 28 2 1',
                dimensions: null,
                bloodgroupId: '611a8111ede051516a94a51a',
                productcodeId: '611a8111ede051516a94a4de',
                productgroupId: '611a8111ede051516a94a4c8',
                specialtestingId: '6213745a8c9c2a1cec8a42ee',
                devicTrackId: null,
                isActive: 1,
                isAssigned: 0,
                authorityId: '617a49b9f3cd7d25585edcb7',
                clientId: '61cc253bb10aa525401f5457',
                locationId: '61cc254db10aa525401f5458',
                deviceId: '61cd2e3b0c7762282c061844',
                trackId: '611a8111ede051516a94a527',
                transferStatus: 'Available',
                code: 'BS-c8dc24f8-6e5c-4d3f-8019-e4d535ae02c3-25',
                createdBy: '612dfbb7ea986e727df1c153',
                updatedBy: '612dfbb7ea986e727df1c153',
                createdAt: '2022-02-21T11:15:38.733Z',
                updatedAt: '2022-02-22T08:52:06.556Z',
                isSync: false,
                deviceTrackId: '611a8111ede051516a94a522',
                drawerNo: null,
                isLedTriggered: 0,
                recipientId: null,
                productgroup: {
                    _id: '611a8111ede051516a94a4c8',
                    code: 'BS-PG-1001',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    name: 'Red Cells',
                    description: 'Red Cells',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.040Z',
                    updatedAt: '2021-08-16T15:15:29.040Z',
                    isSync: true,
                    minimumCount: 80
                },
                productcode: {
                    _id: '611a8111ede051516a94a4de',
                    code: 'BS-PC-35283',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: 'E8829VC0',
                    ausc: 35283,
                    isbtdescription: 'RED CELLS Paediatric Irradiated In SAG-M Leucocyte Depleted Part C',
                    ausdescription: 'Red Cells 3 Of 4 Irradiated SAG-M Leucocyte Depleted',
                    country: 'Australia',
                    'productgroup-code': 'BS-PG-1002',
                    isActive: 1,
                    productgroupId: '611a8111ede051516a94a4c8',
                    createdAt: '2021-08-16T15:15:29.113Z',
                    updatedAt: '2021-09-14T11:46:10.878Z',
                    isSync: true
                },
                bloodgroup: {
                    _id: '611a8111ede051516a94a51a',
                    code: 'BS-BG-2800',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: '2800',
                    name: 'AB Negative',
                    description: 'AB Negative',
                    symbol: 'AB-',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.225Z',
                    updatedAt: '2021-08-16T15:15:29.225Z',
                    isSync: true
                }
            },
            check: true,
            error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
        },
        {
            refSku: {
                _id: '621374248c9c2a1cec8a42e3',
                rfidNumber: 'R98765432345676',
                rfidData: 'rfid Data',
                donationCode: 'R98765432345676',
                collectionDateAndTime: '1970-01-01T00:00:00.000Z',
                expiryDateAndTime: '2022-02-28T14:13:00.000Z',
                expirySchedule: '43 19 28 2 1',
                dimensions: null,
                bloodgroupId: '611a8111ede051516a94a51a',
                productcodeId: '611a8111ede051516a94a4dc',
                productgroupId: '611a8111ede051516a94a4c8',
                specialtestingId: '621374248c9c2a1cec8a42e2',
                devicTrackId: null,
                isActive: 1,
                isAssigned: 0,
                authorityId: '617a49b9f3cd7d25585edcb7',
                clientId: '61cc253bb10aa525401f5457',
                locationId: '61cc254db10aa525401f5458',
                deviceId: '61cd2e3b0c7762282c061844',
                trackId: '611a8111ede051516a94a527',
                transferStatus: 'Available',
                code: 'BS-72e727da-05c0-4cd8-afc5-510a68ab4a72-23',
                createdBy: '612dfbb7ea986e727df1c153',
                updatedBy: '612dfbb7ea986e727df1c153',
                createdAt: '2022-02-21T11:14:44.420Z',
                updatedAt: '2022-02-22T08:52:06.551Z',
                isSync: false,
                deviceTrackId: '611a8111ede051516a94a522',
                drawerNo: null,
                isLedTriggered: 0,
                recipientId: null,
                productgroup: {
                    _id: '611a8111ede051516a94a4c8',
                    code: 'BS-PG-1001',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    name: 'Red Cells',
                    description: 'Red Cells',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.040Z',
                    updatedAt: '2021-08-16T15:15:29.040Z',
                    isSync: true,
                    minimumCount: 80
                },
                productcode: {
                    _id: '611a8111ede051516a94a4dc',
                    code: 'BS-PC-35281',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: 'E8829VA0',
                    ausc: 35281,
                    isbtdescription: 'RED CELLS Paediatric Irradiated In SAG-M Leucocyte Depleted Part A',
                    ausdescription: 'Red Cells 1 Of 4 Irradiated SAG-M Leucocyte Depleted',
                    country: 'Australia',
                    'productgroup-code': 'BS-PG-1005',
                    isActive: 1,
                    productgroupId: '611a8111ede051516a94a4c8',
                    createdAt: '2021-08-16T15:15:29.111Z',
                    updatedAt: '2021-09-14T11:47:03.129Z',
                    isSync: true
                },
                bloodgroup: {
                    _id: '611a8111ede051516a94a51a',
                    code: 'BS-BG-2800',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: '2800',
                    name: 'AB Negative',
                    description: 'AB Negative',
                    symbol: 'AB-',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.225Z',
                    updatedAt: '2021-08-16T15:15:29.225Z',
                    isSync: true
                }
            },
            check: true,
            error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
        }
    ],
    badData: [
        {
            refSku: {
                _id: '621374078c9c2a1cec8a42dd',
                rfidNumber: 'R87654323456777',
                rfidData: 'rfid Data',
                donationCode: 'R87654323456777',
                collectionDateAndTime: '1970-01-01T00:00:00.000Z',
                expiryDateAndTime: '2022-02-28T14:15:00.000Z',
                expirySchedule: '45 19 28 2 1',
                dimensions: null,
                bloodgroupId: '611a8111ede051516a94a517',
                productcodeId: '611a8111ede051516a94a4de',
                productgroupId: '611a8111ede051516a94a4c8',
                specialtestingId: '621374078c9c2a1cec8a42dc',
                devicTrackId: null,
                isActive: 1,
                isAssigned: 0,
                authorityId: '617a49b9f3cd7d25585edcb7',
                clientId: '61cc253bb10aa525401f5457',
                locationId: '61cc254db10aa525401f5458',
                deviceId: '61cd2e3b0c7762282c061844',
                trackId: '611a8111ede051516a94a527',
                transferStatus: 'Available',
                code: 'BS-9bc55745-7e44-4e33-8603-725b5d01b1e9-22',
                createdBy: '612dfbb7ea986e727df1c153',
                updatedBy: '612dfbb7ea986e727df1c153',
                createdAt: '2022-02-21T11:14:15.816Z',
                updatedAt: '2022-02-22T08:52:06.548Z',
                isSync: false,
                deviceTrackId: '611a8111ede051516a94a522',
                drawerNo: null,
                isLedTriggered: 0,
                recipientId: null,
                productgroup: {
                    _id: '611a8111ede051516a94a4c8',
                    code: 'BS-PG-1001',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    name: 'Red Cells',
                    description: 'Red Cells',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.040Z',
                    updatedAt: '2021-08-16T15:15:29.040Z',
                    isSync: true,
                    minimumCount: 80
                },
                productcode: {
                    _id: '611a8111ede051516a94a4de',
                    code: 'BS-PC-35283',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: 'E8829VC0',
                    ausc: 35283,
                    isbtdescription: 'RED CELLS Paediatric Irradiated In SAG-M Leucocyte Depleted Part C',
                    ausdescription: 'Red Cells 3 Of 4 Irradiated SAG-M Leucocyte Depleted',
                    country: 'Australia',
                    'productgroup-code': 'BS-PG-1002',
                    isActive: 1,
                    productgroupId: '611a8111ede051516a94a4c8',
                    createdAt: '2021-08-16T15:15:29.113Z',
                    updatedAt: '2021-09-14T11:46:10.878Z',
                    isSync: true
                },
                bloodgroup: {
                    _id: '611a8111ede051516a94a517',
                    code: 'BS-BG-7300',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: '7300',
                    name: 'B Positive',
                    description: 'B Positive',
                    symbol: 'B+',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.223Z',
                    updatedAt: '2021-08-16T15:15:29.223Z',
                    isSync: true
                }
            },
            check: false,
            error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
        },
        {
            refSku: {
                _id: '6213743e8c9c2a1cec8a42e9',
                rfidNumber: 'R98765434567865',
                rfidData: 'rfid Data',
                donationCode: 'R98765434567865',
                collectionDateAndTime: '1970-01-01T00:00:00.000Z',
                expiryDateAndTime: '2022-02-28T14:14:00.000Z',
                expirySchedule: '44 19 28 2 1',
                dimensions: null,
                bloodgroupId: '611a8111ede051516a94a51a',
                productcodeId: '611a8111ede051516a94a4df',
                productgroupId: '611a8111ede051516a94a4c8',
                specialtestingId: '6213743d8c9c2a1cec8a42e8',
                devicTrackId: null,
                isActive: 1,
                isAssigned: 0,
                authorityId: '617a49b9f3cd7d25585edcb7',
                clientId: '61cc253bb10aa525401f5457',
                locationId: '61cc254db10aa525401f5458',
                deviceId: '61cd2e3b0c7762282c061844',
                trackId: '611a8111ede051516a94a527',
                transferStatus: 'Available',
                code: 'BS-e6007c94-1485-4e59-ad50-97203231294f-24',
                createdBy: '612dfbb7ea986e727df1c153',
                updatedBy: '612dfbb7ea986e727df1c153',
                createdAt: '2022-02-21T11:15:10.029Z',
                updatedAt: '2022-02-22T08:52:06.553Z',
                isSync: false,
                deviceTrackId: '611a8111ede051516a94a522',
                drawerNo: null,
                isLedTriggered: 0,
                recipientId: null,
                productgroup: {
                    _id: '611a8111ede051516a94a4c8',
                    code: 'BS-PG-1001',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    name: 'Red Cells',
                    description: 'Red Cells',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.040Z',
                    updatedAt: '2021-08-16T15:15:29.040Z',
                    isSync: true,
                    minimumCount: 80
                },
                productcode: {
                    _id: '611a8111ede051516a94a4df',
                    code: 'BS-PC-35284',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: 'E8829VD0',
                    ausc: 35284,
                    isbtdescription: 'RED CELLS Paediatric Irradiated In SAG-M Leucocyte Depleted Part D',
                    ausdescription: 'Red Cells 4 Of 4 Irradiated SAG-M Leucodepleted',
                    country: 'Australia',
                    'productgroup-code': 'BS-PG-1003',
                    isActive: 1,
                    productgroupId: '611a8111ede051516a94a4c8',
                    createdAt: '2021-08-16T15:15:29.117Z',
                    updatedAt: '2021-09-14T11:46:04.566Z',
                    isSync: true
                },
                bloodgroup: {
                    _id: '611a8111ede051516a94a51a',
                    code: 'BS-BG-2800',
                    createdBy: '60d9512581faa31eb8c620f6',
                    updatedBy: '60d9512581faa31eb8c620f6',
                    isbtcode: '2800',
                    name: 'AB Negative',
                    description: 'AB Negative',
                    symbol: 'AB-',
                    isActive: 1,
                    createdAt: '2021-08-16T15:15:29.225Z',
                    updatedAt: '2021-08-16T15:15:29.225Z',
                    isSync: true
                }
            },
            check: false,
            error: 'Temperature has been crossed the minimum value for batch undefined,In device Device 3'
        }
    ],
    goodBatchData: [
        {
            batch: {
                _id: '61ec0cf4c186b54f8c84aa0f',
                gtinNumber: '21006426210249',
                batchNumber: '11P1TEST08',
                serialNumber: '010064262128',
                expiryDate: '2022-12-30T00:00:00.000Z',
                tagNumbers: [
                    'e005400112485f04',
                    'e005400112485f05',
                    'e005400112485f06',
                    'e005400112485f01',
                    'e005400112485f02',
                    'e005400112485f03',
                    'e005400112485f07',
                    'e005400112485f08'
                ],
                barcodeNumber: null,
                localDescription: null,
                gtinDescription: null,
                gtinInfo: null,
                availableCount: 6,
                assignedCount: 1,
                batchProductId: {
                    _id: '61cab4415b9a0c36700bf29e',
                    name: 'beta',
                    code: 'BS-0769da77-d626-46ad-905e-de7e0267ae83-2',
                    createdBy: '612dfbb7ea986e727df1c153',
                    updatedBy: '612dfbb7ea986e727df1c153',
                    createdAt: '2021-12-28T06:52:49.349Z',
                    updatedAt: '2021-12-28T06:52:49.349Z',
                    isActive: 1
                },
                code: 'BS-fcac0e86-384d-40ce-90fc-31dcc5ffbfdb-0',
                createdBy: '612dfbb8ea986e727df1c410',
                updatedBy: '612dfbb8ea986e727df1c410',
                createdAt: '2022-01-22T13:56:04.968Z',
                updatedAt: '2022-01-22T13:56:04.968Z',
                isActive: 1,
                dereservationDateAndTime: [
                    {
                        dereservationDateAndTime: '2022-01-23T00:00:00.000Z',
                        assignedCount: 1
                    }
                ],
                deviceBatches: [
                    {
                        deviceId: '61cd2c7b0c7762282c06183f',
                        count: 30,
                        tags: null
                    },
                    {
                        deviceId: '61ee3b50a004f93ac8e07665',
                        count: 0,
                        tags: []
                    },
                    {
                        deviceId: '61cd2e3b0c7762282c061844',
                        count: 3,
                        tags: ['e005400112485f05', 'e005400112485f04', 'e005400112485f06']
                    }
                ],
                notInDeviceCount: -32,
                isSync: false
            },
            check: false,
            error: 'Batch with gtin 21006426210249, The device Device 3 Cannot hold product beta'
        },
        {
            batch: {
                _id: '61ec0cf4c186b54f8c84aa0f',
                gtinNumber: '21006426210249',
                batchNumber: '11P1TEST08',
                serialNumber: '010064262128',
                expiryDate: '2022-12-30T00:00:00.000Z',
                tagNumbers: [
                    'e005400112485f04',
                    'e005400112485f05',
                    'e005400112485f06',
                    'e005400112485f01',
                    'e005400112485f02',
                    'e005400112485f03',
                    'e005400112485f07',
                    'e005400112485f08'
                ],
                barcodeNumber: null,
                localDescription: null,
                gtinDescription: null,
                gtinInfo: null,
                availableCount: 6,
                assignedCount: 1,
                batchProductId: {
                    _id: '61cab4415b9a0c36700bf29e',
                    name: 'beta',
                    code: 'BS-0769da77-d626-46ad-905e-de7e0267ae83-2',
                    createdBy: '612dfbb7ea986e727df1c153',
                    updatedBy: '612dfbb7ea986e727df1c153',
                    createdAt: '2021-12-28T06:52:49.349Z',
                    updatedAt: '2021-12-28T06:52:49.349Z',
                    isActive: 1
                },
                code: 'BS-fcac0e86-384d-40ce-90fc-31dcc5ffbfdb-0',
                createdBy: '612dfbb8ea986e727df1c410',
                updatedBy: '612dfbb8ea986e727df1c410',
                createdAt: '2022-01-22T13:56:04.968Z',
                updatedAt: '2022-01-22T13:56:04.968Z',
                isActive: 1,
                dereservationDateAndTime: [
                    {
                        dereservationDateAndTime: '2022-01-23T00:00:00.000Z',
                        assignedCount: 1
                    }
                ],
                deviceBatches: [
                    {
                        deviceId: '61cd2c7b0c7762282c06183f',
                        count: 30,
                        tags: null
                    },
                    {
                        deviceId: '61ee3b50a004f93ac8e07665',
                        count: 0,
                        tags: []
                    },
                    {
                        deviceId: '61cd2e3b0c7762282c061844',
                        count: 3,
                        tags: ['e005400112485f05', 'e005400112485f04', 'e005400112485f06']
                    }
                ],
                notInDeviceCount: -32,
                isSync: false
            },
            check: false,
            error: 'Batch with gtin 21006426210249, The device Device 3 Cannot hold product beta'
        }
    ],
    badBatchData: [
        {
            batch: {
                _id: '61ec0cf4c186b54f8c84aa0f',
                gtinNumber: '21006426210249',
                batchNumber: '11P1TEST08',
                serialNumber: '010064262128',
                expiryDate: '2022-12-30T00:00:00.000Z',
                tagNumbers: [
                    'e005400112485f04',
                    'e005400112485f05',
                    'e005400112485f06',
                    'e005400112485f01',
                    'e005400112485f02',
                    'e005400112485f03',
                    'e005400112485f07',
                    'e005400112485f08'
                ],
                barcodeNumber: null,
                localDescription: null,
                gtinDescription: null,
                gtinInfo: null,
                availableCount: 6,
                assignedCount: 1,
                batchProductId: {
                    _id: '61cab4415b9a0c36700bf29e',
                    name: 'beta',
                    code: 'BS-0769da77-d626-46ad-905e-de7e0267ae83-2',
                    createdBy: '612dfbb7ea986e727df1c153',
                    updatedBy: '612dfbb7ea986e727df1c153',
                    createdAt: '2021-12-28T06:52:49.349Z',
                    updatedAt: '2021-12-28T06:52:49.349Z',
                    isActive: 1
                },
                code: 'BS-fcac0e86-384d-40ce-90fc-31dcc5ffbfdb-0',
                createdBy: '612dfbb8ea986e727df1c410',
                updatedBy: '612dfbb8ea986e727df1c410',
                createdAt: '2022-01-22T13:56:04.968Z',
                updatedAt: '2022-01-22T13:56:04.968Z',
                isActive: 1,
                dereservationDateAndTime: [
                    {
                        dereservationDateAndTime: '2022-01-23T00:00:00.000Z',
                        assignedCount: 1
                    }
                ],
                deviceBatches: [
                    {
                        deviceId: '61cd2c7b0c7762282c06183f',
                        count: 30,
                        tags: null
                    },
                    {
                        deviceId: '61ee3b50a004f93ac8e07665',
                        count: 0,
                        tags: []
                    },
                    {
                        deviceId: '61cd2e3b0c7762282c061844',
                        count: 3,
                        tags: ['e005400112485f05', 'e005400112485f04', 'e005400112485f06']
                    }
                ],
                notInDeviceCount: -32,
                isSync: false
            },
            check: false,
            error: 'Batch with gtin 21006426210249, The device Device 3 Cannot hold product beta'
        }
    ]
};
