const Sections = () => import("@/views/section/sections")
const Section = () => import("@/views/section/section")
const SectionItems = () => import("@/views/section/sectionItems")
const SectionItem = () => import("@/views/section/sectionItem")

export default {
  path: "sections",
  meta: {
    label: 'Sections'
  },
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      name: "Sections",
      component: Sections,
      path: '',
    },
    {
      name: "SectionNew",
      path: "new",
      component: Section,
      props: {
        isNew: true
      }
    },
    {
      name: "Section",
      path: ":id",
      component: Section,

    },
    {
      name: "SectionItems",
      path: ":id/items",
      component: SectionItems
    },
    {
      name: "SectionItemNew",
      path: ":id/new",
      component: SectionItem,
      props: {
        isNew: true
      }
    },
    {
      name: "SectionItem",
      path: ":id/:itemId",
      component: SectionItem
    },


  ]
}