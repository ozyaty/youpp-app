import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import { useTelegram } from '@/contexts/TelegramContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageWrapper from '@/components/PageWrapper'; // ✅

const HelpSupportPage = () => {
  const { setHeaderConfig } = useTelegram();

  useEffect(() => {
    setHeaderConfig({ title: 'Help & Support', showBackButton: true });

    return () => {
      setHeaderConfig({ title: null, showBackButton: false, rightAction: null });
    };
  }, [setHeaderConfig]);

  const faqs = [
    {
      question: "How do I change my password?",
      answer: "You can change your password from the Account Details page. If you've forgotten your password, use the 'Forgot Password' link on the login screen (feature not yet implemented for login screen)."
    },
    {
      question: "How do I make my profile private?",
      answer: "Navigate to Menu > Privacy & Security. There you will find an option to toggle your profile between public and private."
    },
    {
      question: "How can I report a user or post?",
      answer: "To report a user or post, click the three-dot menu on the post or user's profile and select 'Report'. Our team will review the report."
    },
    {
      question: "Where can I find the terms of service?",
      answer: "Our Terms of Service and Community Guidelines can be found at the bottom of our website or by searching 'Terms' in the app."
    }
  ];

  const supportOptions = [
    {
      id: 'faq',
      title: 'FAQs',
      description: 'Find answers to common questions.',
      icon: HelpCircle,
      action: () => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'guides',
      title: 'User Guides',
      description: 'Learn how to use app features.',
      icon: FileText,
      action: () => alert('User Guides: Coming soon!')
    },
    {
      id: 'contact',
      title: 'Contact Support',
      description: 'Get help from our support team.',
      icon: MessageSquare,
      action: () => alert('Contact Support: support@yourapp.com')
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Read our privacy policy.',
      icon: ShieldCheck,
      action: () => alert('Privacy Policy: Link to privacy policy page.')
    },
  ];

  return (
    <PageWrapper>
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-telegram-text">How can we help?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {supportOptions.map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={option.action}
                className="p-4 bg-telegram-secondary-bg rounded-lg shadow hover:shadow-md transition-shadow text-left flex items-start space-x-3"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-telegram-button-color/20 mt-1">
                  <Icon size={18} className="text-telegram-button-color" />
                </div>
                <div>
                  <h3 className="font-semibold text-telegram-text">{option.title}</h3>
                  <p className="text-xs text-telegram-hint">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div id="faq-section" className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-telegram-text">Frequently Asked Questions</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-telegram-secondary-bg rounded-lg p-2 border border-telegram-divider"
          >
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-telegram-text hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-telegram-hint">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center text-telegram-hint text-sm">
          <p>Can't find what you're looking for?</p>
          <p>
            Contact us at{' '}
            <a href="mailto:support@yourapp.com" className="text-telegram-link">
              support@yourapp.com
            </a>
          </p>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default HelpSupportPage;
