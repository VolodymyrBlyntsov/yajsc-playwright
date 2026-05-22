export const authData = { 
    'email': process.env.USER_EMAIL ?? 'customer2@practicesoftwaretesting.com',
    'password': process.env.USER_PASSWORD ?? 'welcome01'
}

export const products = {
    combinationPliers: {
        'name':  'Combination Pliers',
        'price': '$14.15',
    },
    slipJointPliers: {
        'name': 'Slip Joint Pliers',
        'price': '$9.17'
    }
}


export const headerData = {
    'profileName': process.env.USER_NAME ??  'Jack Howe',
}

export const accountData = {
    accountText: 'My account'
}

// todo: make type ... = { .. : type }
// .. : Type = { ... }

export const billingForm = {
  'country': 'UA',
  'postalCode': '00101',
  'houseNumber': '241',
  'street': 'Freedom',
  'city': 'Mykolaiv',
  'state': 'Mykolaiv Region'
}

export const paymentMethod = {
  'payment': 'Cash on Delivery'
}