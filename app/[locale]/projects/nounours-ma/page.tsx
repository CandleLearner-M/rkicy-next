import { notFound } from 'next/navigation';
import { projects } from '@/components/ProjectsPage/projects';
import ProjectDetail from '@/components/ProjectsPage/ProjectDetail';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const project = projects.find(p => p.id === 'nounours-ma');
  if (!project) return {};
  
  const t = await getTranslations({ locale, namespace: 'featured.projects.nounours' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function NounoursProjectPage() {
  const project = projects.find(p => p.id === 'nounours-ma');
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetail project={project} />;
}