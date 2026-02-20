import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import { Send, CheckCircle } from 'lucide-react';

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const { values, errors, isSubmitting, handleChange, handleSubmit, reset } = useForm(
        {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        async (formData) => {
            // Simulate sending form data
            console.log('Form submitted:', formData);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            setSubmitted(true);
            reset();

            // Hide success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }
    );

    return (
        <div>
            {submitted && (
                <div
                    style={{
                        backgroundColor: '#f0fdf4',
                        border: '2px solid #10b981',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <CheckCircle size={32} color="#10b981" />
                    <div>
                        <h3 style={{ color: '#166534', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                            Message Sent Successfully!
                        </h3>
                        <p style={{ color: '#166534', margin: 0 }}>
                            Thank you for reaching out. I'll get back to you within 24 hours.
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Your name"
                            required
                            disabled={isSubmitting}
                        />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="your@email.com"
                            required
                            disabled={isSubmitting}
                        />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Phone (optional)</label>
                    <input
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="(123) 456-7890"
                        disabled={isSubmitting}
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Tell me about your tennis goals and experience level..."
                        rows="5"
                        required
                        disabled={isSubmitting}
                    />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                </div>

                {errors.general && (
                    <div
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            borderRadius: '0.5rem',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                        }}
                    >
                        {errors.general}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '1.125rem',
                    }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        'Sending...'
                    ) : (
                        <>
                            <Send size={20} />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;