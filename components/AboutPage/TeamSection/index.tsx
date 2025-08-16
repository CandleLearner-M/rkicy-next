import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './TeamSection.module.scss';
import { Linkedin, Mail, ChevronRight } from 'lucide-react';

export default function TeamSection() {
  const t = useTranslations('about.team');
  
  const teamMembers = [
    {
      name: t('members.ceo.name'),
      position: t('members.ceo.position'),
      bio: t('members.ceo.bio'),
      social: {
        linkedin: 'https://linkedin.com/',
        email: 'mailto:ceo@rkicy.com'
      }
    },
    {
      name: t('members.cto.name'),
      position: t('members.cto.position'),
      bio: t('members.cto.bio'),
      social: {
        linkedin: 'https://linkedin.com/',
        email: 'mailto:cto@rkicy.com'
      }
    },
    {
      name: t('members.coo.name'),
      position: t('members.coo.position'),
      bio: t('members.coo.bio'),
      social: {
        linkedin: 'https://linkedin.com/',
        email: 'mailto:coo@rkicy.com'
      }
    },
    {
      name: t('members.sales.name'),
      position: t('members.sales.position'),
      bio: t('members.sales.bio'),
      social: {
        linkedin: 'https://linkedin.com/',
        email: 'mailto:sales@rkicy.com'
      }
    }
  ];
  
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>{t('badge')}</div>
          <h2 className={styles.sectionTitle}>
            {t('title.start')} <span className={styles.highlight}>{t('title.highlight')}</span>
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>
        
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div className={styles.teamCard} key={member.name}>
              <div className={styles.memberAvatar}>
                <div className={styles.avatarPlaceholder}>
                  <span>{member.name.charAt(0)}</span>
                </div>
                <div className={styles.avatarDecor}></div>
              </div>
              
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <span className={styles.memberPosition}>{member.position}</span>
                <p className={styles.memberBio}>{member.bio}</p>
                
                <div className={styles.memberSocial}>
                  <a href={member.social.linkedin} className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={18} />
                  </a>
                  <a href={member.social.email} className={styles.socialLink} aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.teamCta}>
          <p className={styles.ctaText}>{t('cta.text')}</p>
          <a href="/careers" className={styles.ctaButton}>
            {t('cta.button')} <ChevronRight size={16} />
          </a>
        </div>
        
        <div className={styles.decorElements}>
          <div className={styles.decorPattern1}></div>
          <div className={styles.decorPattern2}></div>
          <div className={styles.decorGradient}></div>
        </div>
      </div>
    </section>
  );
}