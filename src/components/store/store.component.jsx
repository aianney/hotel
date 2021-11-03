const Store = {
    env: {
        colors: {
            primary: '#6dc7b8'
        }
    },
    roomSelection: {
        superiorSeaView: [
            {
                adults: 1,
                children: 0,
                addOns: {
                    adults: 3,
                    children: 0,
                },
                rates: 0
            },
        ],
        standardRoom: [

        ],
        rates: {
            superiorSeaView: [
                { name: 'SSV-1', price: 1500 },
                { name: 'SSV-2', price: 1750 },
                { name: 'SSV-3', price: 2000 },
            ]
        }
    },
    guestDetails: {

    },
    payment: {

    }
}

export default Store;