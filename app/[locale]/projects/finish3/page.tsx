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
  const project = projects.find(p => p.id === 'finish3');
  if (!project) return {};
  
  const t = await getTranslations({ locale, namespace: 'featured.projects.finish3' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Finish3ProjectPage() {
  const project = projects.find(p => p.id === 'finish3');
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetail project={project} />;
}