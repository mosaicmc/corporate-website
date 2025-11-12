import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    language: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your form handling service
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        location: '',
        language: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const offices = [
    {
      name: "Charlestown (Head Office)",
      address: "Level 3, 3 Hopetoun St, Charlestown NSW 2290",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)"
    },
    {
      name: "Central Coast",
      address: "Tuggerah Lakes Community Centre, 1 Bay Village Road, Bateau Bay NSW 2261",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)"
    },
    {
      name: "Tamworth",
      address: "3/345 Peel Street, Tamworth NSW 2340",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)"
    },
    {
      name: "Armidale",
      address: "86 Beardy Street, Armidale NSW 2350",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)"
    }
  ];

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>{t('contact.title')} - Mosaic Multicultural Connections</title>
        <meta name="description" content={t('contact.description')} />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('contact.badge')}</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('contact.title')}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('contact.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <Section overlay>
        <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">{t('contact.form.title')}</h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('contact.form.fields.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('contact.form.fields.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('contact.form.fields.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('contact.form.fields.language')}
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      >
                        <option value="">{t('contact.form.fields.languageOptions.select')}</option>
                        <option value="english">{t('contact.form.fields.languageOptions.english')}</option>
                        <option value="arabic">{t('contact.form.fields.languageOptions.arabic')}</option>
                        <option value="mandarin">{t('contact.form.fields.languageOptions.mandarin')}</option>
                        <option value="spanish">{t('contact.form.fields.languageOptions.spanish')}</option>
                        <option value="vietnamese">{t('contact.form.fields.languageOptions.vietnamese')}</option>
                        <option value="tagalog">{t('contact.form.fields.languageOptions.tagalog')}</option>
                        <option value="hindi">{t('contact.form.fields.languageOptions.hindi')}</option>
                        <option value="korean">{t('contact.form.fields.languageOptions.korean')}</option>
                        <option value="other">{t('contact.form.fields.languageOptions.other')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('contact.form.fields.service')}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      >
                        <option value="">{t('contact.form.fields.serviceOptions.select')}</option>
                        <option value="settlement">{t('contact.form.fields.serviceOptions.settlement')}</option>
                        <option value="aged-care">{t('contact.form.fields.serviceOptions.agedCare')}</option>
                        <option value="family">{t('contact.form.fields.serviceOptions.familySupport')}</option>
                        <option value="community">{t('contact.form.fields.serviceOptions.communityEngagement')}</option>
                        <option value="volunteer">{t('contact.form.fields.serviceOptions.volunteer')}</option>
                        <option value="general">{t('contact.form.fields.serviceOptions.general')}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('contact.form.fields.location')}
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      >
                        <option value="">{t('contact.form.fields.locationOptions.select')}</option>
                        <option value="newcastle">{t('contact.form.fields.locationOptions.newcastle')}</option>
                        <option value="central-coast">{t('contact.form.fields.locationOptions.centralCoast')}</option>
                        <option value="lake-macquarie">{t('contact.form.fields.locationOptions.lakeMacquarie')}</option>
                        <option value="hunter">{t('contact.form.fields.locationOptions.hunterRegion')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {t('contact.form.fields.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      placeholder={t('contact.form.fields.placeholders.message')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-colors group"
                  >
                    <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    {t('contact.form.submit')}
                  </button>

                  <p className="text-sm text-muted-foreground">
                    {t('contact.form.note')}
                  </p>
                </form>
              ) : (
                <div className="backdrop-blur-md bg-leaf/10 dark:bg-leaf/5 border border-leaf/20 dark:border-leaf/10 rounded-lg p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-leaf mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{t('contact.success.title')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('contact.success.message')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.success.urgentNote')}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                {/* Quick Contact */}
                <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-lg p-6 border border-white/20 dark:border-slate-700/50 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-sky" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Main Line</div>
                        <a href="tel:1800813205" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                          1800 813 205
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-sky" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Email</div>
                        <a href="mailto:info@mosaicmc.org.au" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                          info@mosaicmc.org.au
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-sky mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Business Hours</div>
                        <div className="text-gray-600 dark:text-gray-300">
                          Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Services */}
                <div className="backdrop-blur-md bg-sun/10 dark:bg-sun/5 border border-sun/20 dark:border-sun/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Emergency Services</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We do not provide 24/7 emergency support. For crisis services and emergency contacts, please visit our resources.
                  </p>
                  <div className="space-y-2">
                    <a href="/resources" className="inline-flex items-center px-4 py-2 rounded-lg bg-sun text-white font-medium hover:bg-sun/90 transition-colors">
                      View Emergency Services
                    </a>
                  </div>
                </div>

                {/* Language Support */}
                <div className="backdrop-blur-md bg-sky/10 dark:bg-sky/5 border border-sky/20 dark:border-sky/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Language Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We have multilingual staff available in:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>• Arabic</div>
                    <div>• Mandarin</div>
                    <div>• Spanish</div>
                    <div>• Vietnamese</div>
                    <div>• Tagalog</div>
                    <div>• Hindi</div>
                    <div>• Korean</div>
                    <div>• And more...</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                    Interpreter services available for other languages via TIS: 131 450
                  </p>
                </div>
              </div>
            </div>
          </div>
      </Section>

      {/* Office Locations */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Office Locations</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Visit us at any of our four convenient locations across NSW.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-lg p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{office.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-sky mt-1 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{office.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-sky flex-shrink-0" />
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-sky flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                      {office.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-sky flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{office.hours}</span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Visit Office
                  </button>
                  <button className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;