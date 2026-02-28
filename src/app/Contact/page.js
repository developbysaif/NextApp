"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import PageHeader from '../../component/PageHeader';
import Subscribe from '../../component/Subscribe';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.type === 'text' && e.target.placeholder === 'First Name' ? 'firstName' :
                e.target.type === 'text' && e.target.placeholder === 'Last Name' ? 'lastName' :
                    e.target.type === 'email' ? 'email' :
                        e.target.placeholder === 'Subject' ? 'subject' : 'message']: e.target.value
        });
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        // Store data in local cache/storage
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        alert('Your message has been sent successfully and saved to local storage!');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="font-[Poppins] bg-white text-gray-800">

            {/* Header using PageHeader component */}
            <PageHeader
                title="Contact Us"
                description="We'd love to hear from you!"
                backgroundImage="/header.jpg"
            />

            {/* Contact Form */}
            <section className="container mx-auto px-6 md:px-20 py-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <p className="text-lg font-medium mb-6">Please complete the form below.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full border-b-2 border-gray-300 focus:border-[#22aa4f] outline-none py-2 transition-all duration-300"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full border-b-2 border-gray-300 focus:border-[#22aa4f] outline-none py-2 transition-all duration-300"
                            required
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full border-b-2 border-gray-300 focus:border-[#22aa4f] outline-none py-2 transition-all duration-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full border-b-2 border-gray-300 focus:border-[#22aa4f] outline-none py-2 transition-all duration-300"
                        required
                    />
                    <textarea
                        placeholder="Message"
                        rows="4"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="w-full border-b-2 border-gray-300 focus:border-[#22aa4f] outline-none py-2 transition-all duration-300"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-[#21492f] text-white px-8 py-3 rounded-full hover:bg-[#22aa4f] transition-all duration-300 ease-in-out active:scale-95 font-bold tracking-wide shadow-lg shadow-green-900/20"
                    >
                        SEND MESSAGE
                    </button>
                </form>
            </section>

            <Subscribe />

        </div>
    );
}
