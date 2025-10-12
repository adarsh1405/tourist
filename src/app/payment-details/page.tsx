import { CreditCard, Shield, Clock, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function PaymentDetailsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Details & Information</h1>
                    <p className="text-xl text-gray-600">Secure, transparent, and convenient payment options for your Puri tour packages</p>
                </div>

                {/* Payment Methods */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Accepted Payment Methods</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Credit/Debit Cards</h3>
                            <p className="text-gray-600 text-sm">Visa, MasterCard, American Express, RuPay</p>
                        </Card>

                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-orange-600 font-bold text-lg">UPI</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">UPI Payments</h3>
                            <p className="text-gray-600 text-sm">Google Pay, PhonePe, Paytm, BHIM</p>
                        </Card>

                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 font-bold text-lg">NB</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Net Banking</h3>
                            <p className="text-gray-600 text-sm">All major banks supported</p>
                        </Card>
                    </div>
                </section>

                {/* Security Features */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Security & Trust</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <div className="flex items-center mb-4">
                                <Shield className="h-8 w-8 text-green-600 mr-3" />
                                <h3 className="font-bold text-lg">SSL Encrypted</h3>
                            </div>
                            <p className="text-gray-600">All transactions are secured with 256-bit SSL encryption to protect your financial information.</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center mb-4">
                                <CheckCircle className="h-8 w-8 text-blue-600 mr-3" />
                                <h3 className="font-bold text-lg">PCI Compliant</h3>
                            </div>
                            <p className="text-gray-600">Our payment gateway is PCI DSS compliant, ensuring the highest standards of payment security.</p>
                        </Card>
                    </div>
                </section>

                {/* Payment Process */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">How Payment Works</h2>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                                <span className="font-bold text-sm">1</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Select Your Package</h3>
                                <p className="text-gray-600">Choose your preferred tour package and customize your options.</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                                <span className="font-bold text-sm">2</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Review & Confirm</h3>
                                <p className="text-gray-600">Review your booking details and total amount before proceeding to payment.</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                                <span className="font-bold text-sm">3</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
                                <p className="text-gray-600">Complete your payment using any of our secure payment methods.</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                                <span className="font-bold text-sm">4</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Instant Confirmation</h3>
                                <p className="text-gray-600">Receive instant booking confirmation via email and SMS.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing & Fees */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Fees</h2>
                    <Card className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-green-600">What&apos;s Included</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                        <span className="text-sm">No hidden charges</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                        <span className="text-sm">All taxes included</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                        <span className="text-sm">GST receipts provided</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                        <span className="text-sm">Travel insurance included</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-blue-600">Payment Options</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                                        <span className="text-sm">Pay in full at booking</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                                        <span className="text-sm">50% advance, 50% before travel</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                                        <span className="text-sm">EMI options available (3-12 months)</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                                        <span className="text-sm">Group booking discounts</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Refund Policy */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund & Cancellation Policy</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-bold text-base mb-2">Cancellation before 30 days</h3>
                                    <p className="text-gray-600 text-sm">100% refund (processing fee of ₹500 applicable)</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-bold text-base mb-2">Cancellation 15-30 days before</h3>
                                    <p className="text-gray-600 text-sm">75% refund of the total amount</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-bold text-base mb-2">Cancellation 7-15 days before</h3>
                                    <p className="text-gray-600 text-sm">50% refund of the total amount</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-bold text-base mb-2">Cancellation within 7 days</h3>
                                    <p className="text-gray-600 text-sm">No refund applicable</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Contact Support */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 text-center">
                            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Call Support</h3>
                            <p className="text-gray-600 mb-4">24/7 payment assistance</p>
                            <p className="font-semibold text-blue-600">+91 9876543210</p>
                        </Card>

                        <Card className="p-6 text-center">
                            <Mail className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Email Support</h3>
                            <p className="text-gray-600 mb-4">Payment queries & disputes</p>
                            <p className="font-semibold text-orange-600">payments@puritours.com</p>
                        </Card>
                    </div>
                </section>

                {/* Important Notes */}
                <section className="bg-blue-50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Important Payment Information</h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>• All prices are in Indian Rupees (₹) and include applicable taxes</li>
                        <li>• Payment confirmation will be sent to your registered email and mobile number</li>
                        <li>• Please ensure your contact details are correct before making payment</li>
                        <li>• In case of payment failure, amount will be automatically refunded within 5-7 business days</li>
                        <li>• For international payments, additional currency conversion charges may apply</li>
                        <li>• Keep your payment receipt for future reference and claims</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
