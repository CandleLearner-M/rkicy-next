"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { X, CheckCircle, Info, Shield, ChartBar, Target } from 'lucide-react';
import styles from './CookieConsent.module.scss';

export default function CookieConsent() {
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
          <h3>Paramètres de confidentialité</h3>
          <button 
            className={styles.closeButton} 
            onClick={() => savePreferences()}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.modalTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Aperçu
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'details' ? styles.active : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Détails et préférences
          </button>
        </div>
        
        <div className={styles.modalContent}>
          {activeTab === 'overview' ? (
            <div className={styles.overviewContent}>
              <div className={styles.consentIcon}>
                <Shield size={40} className={styles.shieldIcon} />
              </div>
              
              <h4>Nous respectons votre vie privée</h4>
              
              <p>
                Nous utilisons des cookies pour améliorer votre expérience de navigation, 
                personnaliser le contenu et les publicités, fournir des fonctionnalités de 
                médias sociaux et analyser notre trafic. Nous partageons également des informations 
                sur votre utilisation de notre site avec nos partenaires de médias sociaux, 
                de publicité et d'analyse.
              </p>
              
              <p className={styles.essentialNote}>
                <Info size={16} />
                <span>Les cookies essentiels sont toujours actifs car ils sont nécessaires au fonctionnement du site.</span>
              </p>
              
              <div className={styles.overviewActions}>
                <button className={styles.secondaryButton} onClick={() => setActiveTab('details')}>
                  Personnaliser
                </button>
                <button className={styles.primaryButton} onClick={acceptAll}>
                  Tout accepter
                </button>
              </div>
              
              <div className={styles.legalLinks}>
                <Link href={`/${locale}/cookies`}>Politique de cookies</Link>
                <span className={styles.dot}>•</span>
                <Link href={`/${locale}/privacy`}>Politique de confidentialité</Link>
                <span className={styles.dot}>•</span>
                <Link href={`/${locale}/terms`}>Conditions d'utilisation</Link>
              </div>
            </div>
          ) : (
            <div className={styles.detailsContent}>
              <div className={styles.cookieCategories}>
                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryInfo}>
                      <Shield size={20} className={styles.categoryIcon} />
                      <h4>Cookies essentiels</h4>
                    </div>
                    <div className={`${styles.toggle} ${styles.disabled}`}>
                      <div className={styles.toggleSlider}></div>
                    </div>
                  </div>
                  <p>Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.</p>
                </div>
                
                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryInfo}>
                      <ChartBar size={20} className={styles.categoryIcon} />
                      <h4>Cookies de performance</h4>
                    </div>
                    <button
                      className={`${styles.toggle} ${preferences.performance ? styles.active : ''}`}
                      onClick={() => handleToggle('performance')}
                      aria-pressed={preferences.performance}
                    >
                      <div className={styles.toggleSlider}></div>
                    </button>
                  </div>
                  <p>Nous aident à comprendre comment les visiteurs interagissent avec notre site, à mesurer les performances et à améliorer l'expérience utilisateur.</p>
                </div>
                
                <div className={styles.cookieCategory}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryInfo}>
                      <Target size={20} className={styles.categoryIcon} />
                      <h4>Cookies de marketing</h4>
                    </div>
                    <button
                      className={`${styles.toggle} ${preferences.marketing ? styles.active : ''}`}
                      onClick={() => handleToggle('marketing')}
                      aria-pressed={preferences.marketing}
                    >
                      <div className={styles.toggleSlider}></div>
                    </button>
                  </div>
                  <p>Utilisés pour vous présenter des publicités pertinentes sur d'autres sites web et pour mesurer l'efficacité de nos campagnes promotionnelles.</p>
                </div>
              </div>
              
              <div className={styles.detailsActions}>
                <button className={styles.secondaryButton} onClick={() => savePreferences()}>
                  Enregistrer les préférences
                </button>
                <button className={styles.primaryButton} onClick={acceptAll}>
                  Tout accepter
                </button>
              </div>
            </div>
          )}
        </div>
        
        {saved && (
          <div className={styles.savedConfirmation}>
            <CheckCircle size={18} />
            <span>Préférences enregistrées</span>
          </div>
        )}
      </div>
    </div>
  );
}