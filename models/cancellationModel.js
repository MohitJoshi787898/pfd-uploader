const mongoose = require('mongoose');

const CancellationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    landlineNumber: {
        type: String,
        required: false,
    },
    residentialAddress: {
        streetAddress: {
            type: String,
            required: true,
        },
        streetAddressLine2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: true,
        },
        stateOrProvince: {
            type: String,
            required: true,
        },
        postalOrZipCode: {
            type: String,
            required: true,
        },
    },
    transactionIDToCancel: {
        type: String,
        required: true,
    },
    dateOfTransaction: {
        type: Date,
        required: true,
    },
    reasonForCancellation: {
        type: [String],
        enum: ['Incorrect pricing occurs when a product is displayed', 'Fraudulent activity', 'Purchased The Wrong Item/Changed Their Mind', 'Find a better low price in another platform', "Cancel this transaction, Do not need it, Wrongly Placed this order", "Other"],
        required: true,
    },
    transactionAmountToCancel: {
        type: Number,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    otherBankName: {
        type: String,
        required: function () {
            return this.bankName === 'Other';
        },
    },
    bankAccountType: {
        type: String,
        enum: ['Checking Account', 'Savings Account', 'Virtual Wallet', "Certificate of Deposit", "Money Market"],
        required: true,
    },
    useOnlineBanking: {
        type: Boolean,
        required: true,
    },
    acceptRefundPolicy: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Cancellation', CancellationSchema);
