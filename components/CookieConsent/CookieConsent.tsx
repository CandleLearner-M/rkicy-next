"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { X, CheckCircle, Info, Shield, ChartBar, Target } from 'lucide-react';
import styles from './CookieConsent.module.scss';

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [showConsent, setShowConsent] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [preferences, setPreferences] = useState({
    essential: true, // Always enabled
    performance: false,
    functional: false,
    marketing: false
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consentData = localStorage.getItem('cookie-consent-data');
    
    if (consentData) {
      try {
        const savedPreferences = JSON.parse(consentData);
        setPreferences(prev => ({
          ...prev,
          ...savedPreferences
        }));
      } catch (e) {
        // If parsing fails, show the consent dialog
        setTimeout(() => setShowConsent(true), 1500);
      }
    } else {
      // Show banner after a short delay if no consent data
      setTimeout(() => setShowConsent(true), 1500);
    }
  }, []);

  const handleToggle = (category) => {
    if (category === 'essential') return; // Can't toggle essential cookies
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const acceptAll = () => {
    const allEnabled = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true
    };
    setPreferences(allEnabled);
    savePreferences(allEnabled);
  };

  const savePreferences = (prefs = preferences) => {
    localStorage.setItem('cookie-consent-data', JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => {
      setShowConsent(false);
      setSaved(false);
    }, 1000);
    
    // Here you would initialize cookies based on preferences
    // For example:
    if (prefs.performance) {
      // Initialize analytics
      console.log('Analytics initialized');
    }
    
    if (prefs.marketing) {
      // Initialize marketing cookies
      console.log('Marketing cookies initialized');
    }
  };

  if (!showConsent) return null;

  return (
    <div className={styles.cookieConsentOverlay}>
      <div className={styles.cookieConsentModal}>
        <div className={styles.modalHeader}>
          <h3>{t('modal.title')}</h3>
          <button 
            className={styles.closeButton} 
            onClick={() => savePreferences()}
            aria-label={t('actions.close')}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.modalTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {t('tabs.overview')}
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'details' ? styles.active : ''}`}
            onClick={() => setActiveTab('details')}
          >
            {t('tabs.details')}
          </button>
        </div>
        
        <div className={styles.modalContent}>
          {activeTab === 'overview' ? (
            <div className={styles.overviewContent}>
              <div className={styles.consentIcon}>
                <Shield size={40} className={styles.shieldIcon} />
              </div>
              
              <h4>{t('overview.title')}</h4>
              
              <p>
                {t('overview.description')}
              </p>
              
              <p className={styles.essentialNote}>
                <Info size={16} />
                <span>{t('overview.essentialNote')}</span>
              </p>
              
              <div className={styles.overviewActions}>
                <button className={styles.secondaryButton} onClick={() => setActiveTab('details')}>
                  {t('actions.customize')}
                </button>
                <button className={styles.primaryButton} onClick={acceptAll}>
                  {t('actions.acceptAll')}
                </button>
              </div>
              
              <div className={styles.legalLinks}>
                <Link href={`/${locale}/cookies`}>{t('links.cookiePolicy')}</Link>
                <span className={styles.dot}>•</span>
                <Link href={`/${locale}/privacy`}>{t('links.privacyPolicy')}</Link>
                <span className={styles.dot}>•</span>
                <Link href={`/${locale}/terms`}>{t('links.terms')}</Link>
              </div>
            </div>
          ) : (
            <div className={styles.detailsContent}>
              <div className={styles.cookieCategories}>
                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryInfo}>
                      <Shield size={20} className={styles.categoryIcon} />
                      <h4>{t('categories.essential.title')}</h4>
                    </div>
                    <div className={`${styles.toggle} ${styles.disabled}`}>
                      <div className={styles.toggleSlider}></div>
                    </div>
                  </div>
                  <p>{t('categories.essential.description')}</p>
                </div>
                
                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryInfo}>
                      <ChartBar size={20} className={styles.categoryIcon} />
                      <h4>{t('categories.performance.title')}</h4>
                    </div>
                    <button
                      className={`${styles.toggle} ${preferences.performance ? styles.active : ''}`}
                      onClick={() => handleToggle('performance')}
                      aria-pressed={preferences.performance}
                    >
                      <div className={styles.toggleSlider}></div>
                    </button>
                  </div>
                  <p>{t('categories.performance.description')}</p>
                </div>
                
                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryInfo}>
                      <Target size={20} className={styles.categoryIcon} />
                      <h4>{t('categories.marketing.title')}</h4>
                    </div>
                    <button
                      className={`${styles.toggle} ${preferences.marketing ? styles.active : ''}`}
                      onClick={() => handleToggle('marketing')}
                      aria-pressed={preferences.marketing}
                    >
                      <div className={styles.toggleSlider}></div>
                    </button>
                  </div>
                  <p>{t('categories.marketing.description')}</p>
                </div>
              </div>
              
              <div className={styles.detailsActions}>
                <button className={styles.secondaryButton} onClick={() => savePreferences()}>
                  {t('actions.savePreferences')}
                </button>
                <button className={styles.primaryButton} onClick={acceptAll}>
                  {t('actions.acceptAll')}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {saved && (
          <div className={styles.savedConfirmation}>
            <CheckCircle size={18} />
            <span>{t('notifications.saved')}</span>
          </div>
        )}
      </div>
    </div>
  );
}