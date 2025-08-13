import PageHeader from "@/components/Layout/PageHeader"

function HardwarePage() {
  return (
    <main>
      <PageHeader 
        titleKey="title"
        subtitleKey="subtitle"
        badgeKey="badge"
        namespace="hardware"
        highlightKey="title"
        breadcrumbs={[
          { labelKey: "home", href: "/" },
          { labelKey: "page", href: "/hardware", active: true }
        ]}
      />
    </main>
  )
}
export default HardwarePage