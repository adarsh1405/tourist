import { Shield, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function TermsConditionsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
                    <p className="text-xl text-gray-600">Please read these terms carefully before booking your tour package</p>
                    <p className="text-sm text-gray-500 mt-2">Last updated: October 11, 2025</p>
                </div>

                {/* Quick Overview */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="text-center p-6">
                            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Your Rights</h3>
                            <p className="text-gray-600 text-sm">Protected bookings with transparent policies</p>
                        </Card>

                        <Card className="text-center p-6">
                            <Scale className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Fair Terms</h3>
                            <p className="text-gray-600 text-sm">Balanced terms that protect both parties</p>
                        </Card>

                        <Card className="text-center p-6">
                            <CheckCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Clear Policies</h3>
                            <p className="text-gray-600 text-sm">No hidden clauses or confusing language</p>
                        </Card>
                    </div>
                </section>

                {/* Terms Sections */}
                <div className="space-y-8">
                    {/* Acceptance of Terms */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <Card className="p-6">
                            <p className="text-gray-700 mb-4">
                                By accessing and using the Puri Tours website and services, you accept and agree to be bound by the terms
                                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                            <p className="text-gray-700">
                                These terms apply to all visitors, users, and others who access or use our service.
                            </p>
                        </Card>
                    </section>

                    {/* Booking Terms */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Booking Terms & Conditions</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Booking Confirmation</h3>
                                    <p className="text-gray-700">
                                        All bookings are subject to availability and confirmation. A booking is confirmed only after receipt of
                                        full payment or agreed advance payment. Confirmation will be sent via email and SMS.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Package Inclusions</h3>
                                    <p className="text-gray-700">
                                        Package details, inclusions, and exclusions are clearly mentioned in the booking confirmation.
                                        Any additional services not mentioned in the package will be charged separately.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Group Size</h3>
                                    <p className="text-gray-700">
                                        Minimum group size requirements may apply for certain packages. If minimum numbers are not met,
                                        we reserve the right to cancel the tour with full refund or offer alternative arrangements.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Payment Terms */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Payment Methods</h3>
                                    <p className="text-gray-700">
                                        We accept payments via credit/debit cards, net banking, UPI, and other digital payment methods.
                                        All payments are processed through secure, encrypted gateways.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Payment Schedule</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Full payment at the time of booking, OR</li>
                                        <li>50% advance payment at booking, balance 15 days before travel</li>
                                        <li>For bookings made within 15 days of travel: 100% payment required</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Currency & Taxes</h3>
                                    <p className="text-gray-700">
                                        All prices are quoted in Indian Rupees (INR) and include applicable taxes. GST invoices will be
                                        provided for all transactions.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Cancellation Policy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cancellation & Refund Policy</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <div className="flex items-center mb-2">
                                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                                        <h3 className="font-bold text-lg text-yellow-800">Cancellation Timeline</h3>
                                    </div>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>• 30+ days before travel: 100% refund (minus ₹500 processing fee)</li>
                                        <li>• 15-30 days before travel: 75% refund</li>
                                        <li>• 7-15 days before travel: 50% refund</li>
                                        <li>• Less than 7 days: No refund</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Refund Process</h3>
                                    <p className="text-gray-700">
                                        Refunds will be processed within 7-10 business days to the original payment method.
                                        Bank processing time may vary.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Force Majeure</h3>
                                    <p className="text-gray-700">
                                        In case of cancellations due to natural disasters, government restrictions, or other force majeure events,
                                        we will work with you to reschedule or provide credit for future travel.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Travel Guidelines */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Travel Guidelines & Responsibilities</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Traveler Responsibilities</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Carry valid identification documents (Aadhaar, Passport, Driving License)</li>
                                        <li>Arrive at meeting points on time as specified in the itinerary</li>
                                        <li>Follow safety guidelines and instructions from tour guides</li>
                                        <li>Respect local customs, traditions, and environmental regulations</li>
                                        <li>Take care of personal belongings and valuables</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Health & Safety</h3>
                                    <p className="text-gray-700">
                                        Travelers are responsible for their own health and safety. Please inform us of any medical conditions,
                                        allergies, or dietary restrictions at the time of booking. Travel insurance is recommended.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Conduct Policy</h3>
                                    <p className="text-gray-700">
                                        We reserve the right to remove any traveler from the tour if their conduct is deemed inappropriate,
                                        disruptive, or harmful to other participants or the tour experience.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Liability & Insurance */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability & Insurance</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Our Liability</h3>
                                    <p className="text-gray-700">
                                        Our liability is limited to the services we directly provide. We are not responsible for losses,
                                        damages, or delays caused by circumstances beyond our control, including but not limited to weather,
                                        natural disasters, strikes, or government actions.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Travel Insurance</h3>
                                    <p className="text-gray-700">
                                        Basic travel insurance is included in our packages. For comprehensive coverage, we recommend purchasing
                                        additional travel insurance that covers medical emergencies, trip cancellation, and personal belongings.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Third-Party Services</h3>
                                    <p className="text-gray-700">
                                        We work with various third-party service providers (hotels, transport, activities). While we ensure
                                        quality standards, we are not liable for issues directly caused by these external providers.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Privacy & Data Protection */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy & Data Protection</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Data Collection</h3>
                                    <p className="text-gray-700">
                                        We collect personal information necessary for booking and travel purposes. This includes contact details,
                                        identification information, and travel preferences.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Data Usage</h3>
                                    <p className="text-gray-700">
                                        Your data is used solely for providing travel services, communication, and improving our offerings.
                                        We do not sell or share your personal information with unauthorized third parties.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Data Security</h3>
                                    <p className="text-gray-700">
                                        We implement appropriate security measures to protect your personal information against unauthorized
                                        access, alteration, disclosure, or destruction.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Changes & Updates */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes & Updates</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Itinerary Changes</h3>
                                    <p className="text-gray-700">
                                        We reserve the right to modify itineraries due to unforeseen circumstances, safety concerns, or force
                                        majeure events. We will provide suitable alternatives and notify travelers as soon as possible.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Terms Updates</h3>
                                    <p className="text-gray-700">
                                        These terms may be updated periodically. Continued use of our services constitutes acceptance of any changes.
                                        Significant changes will be communicated via email or website notification.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Contact Information */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact & Dispute Resolution</h2>
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Customer Support</h3>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 9876543210 (24/7 Support)</p>
                                        <p className="text-gray-700 mb-2"><strong>Email:</strong> support@puritours.com</p>
                                        <p className="text-gray-700 mb-2"><strong>Address:</strong> 123 Marine Drive, Puri, Odisha 752001</p>
                                        <p className="text-gray-700"><strong>Business Hours:</strong> Monday to Sunday, 9:00 AM to 9:00 PM</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Dispute Resolution</h3>
                                    <p className="text-gray-700">
                                        Any disputes arising from these terms or our services will be resolved through negotiation.
                                        If unresolved, disputes will be subject to the jurisdiction of courts in Puri, Odisha.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Agreement Notice */}
                <section className="mt-12 bg-orange-50 border-l-4 border-orange-400 p-6 rounded">
                    <h2 className="text-xl font-bold text-orange-800 mb-4">Agreement Acknowledgment</h2>
                    <p className="text-orange-700 text-sm">
                        By booking any service with Puri Tours, you acknowledge that you have read, understood, and agree to be bound by these
                        Terms & Conditions. If you have any questions or concerns about these terms, please contact us before making a booking.
                    </p>
                </section>
            </div>
        </div>
    );
}
