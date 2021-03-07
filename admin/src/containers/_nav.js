import api from "@/plugins/api"

export default async () => {
  
  const result = await api.get('sections', null, {
    params: {
      perPage: -1
    }
  })
  let sections = result.data && result.data.items
  if (!sections) sections = []
  sections = sections.map(section => ({
    _name: "CSidebarNavItem",
    name: section.name,
    to: `/sections/${section.id}/items`,
    icon: 'cil-library'
  }))
  return [
    {
      _name: 'CSidebarNav',
      _children: [
        {
          _name: "CSidebarNavDropdown",
          name: "Каталог",
          icon: 'cil-cart',


          items: [
            {
              name: "Товары",
              to: "/products"
            },

            {
              name: "Атрибуты",
              to: "/attributes"
            },

            {
              name: "Категории",
              to: "/categories"
            },

            {
              name: "Метки",
              to: "/labels"
            },
            {
              name: "Купоны",
              to: "/promocodes"
            },
            {
              name: "Доставка",
              to: "/deliveries"
            },
            {
              name: "Оплата",
              to: "/payments"
            },
          ]
        },
    
        {
          _name: 'CSidebarNavItem',
          name: 'Заказы',
          to: '/orders',
          icon: 'cil-basket',
        },

        {
          _name: 'CSidebarNavItem',
          name: 'Страницы',
          to: '/pages',
          icon: 'cil-file',
        },

        // {
        //   _name: "CSidebarNavDropdown",
        //   name: 'Разделы',
        //   icon: 'cil-file',
        //   items: [
        //   ]
        // },
        ...sections,

        {
          _name: 'CSidebarNavItem',
          name: 'Уведомления',
          to: '/notys',
          icon: 'cil-bell',
        },


        {
          _name: 'CSidebarNavItem',
          name: 'Пользователи',
          to: '/users',
          icon: 'cil-user',
        },

        {
          _name: "CSidebarNavDropdown",
          name: 'Настройки',
          to: '/settings',
          icon: 'cil-settings',
          items: [

            {
              _name: 'CSidebarNavItem',
              name: 'Шаблоны страниц',
              to: '/page-templates',
              // icon: 'cil-file',
            },
            {
              _name: 'CSidebarNavItem',
              name: 'Разделы',
              to: '/sections',
              // icon: 'cil-file',
            },
            {
              _name: 'CSidebarNavItem',
              name: 'Виджеты',
              to: '/widgets',
              // icon: 'cil-spreadsheet',
            },
            {
              _name: 'CSidebarNavItem',
              name: 'Языки',
              to: '/locales',
              // icon: 'cil-globe-alt',
            },
            {
              _name: 'CSidebarNavItem',
              name: 'Валюты',
              to: '/currencies',
              // icon: 'cil-globe-alt',
            },
            {
              _name: 'CSidebarNavItem',
              name: 'Настройки',
              to: '/settings',
              // icon: 'cil-file',
            },
          ]
        },



      ]
    }
  ]
}