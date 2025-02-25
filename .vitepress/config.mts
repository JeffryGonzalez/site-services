import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Services",
  description: "Hypertheory Training",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Resources', link: '/links'},
      { text: 'Web Api 100', link: '/WebApi100' },
      { text: 'Web Api 200', link: '/WebApi200'},
      { text: 'Code Samples', 
        items: [
        {
          text: 'Configure Await', link: '/code/configure-await'
        },
        {
          text: 'Cancellation Tokens', link: '/code/cancellation-tokens'
        },
          {
            text: 'JWTs in .NET', link: '/code/jwts'
          },
          {
            text: 'Mapperly', link: '/code/mapperly'
          },
          {
            text: 'MongoDb with DotNet', link: '/code/mongodb'
          },
          {
            text: 'Docker Compose', link: '/code/docker-compose'
          },
          { text: 'Postgres Container Prep', link: '/code/postgres-container'},
          { text: 'Sql Server Container Prep', link: '/code/sqlserver-container'}
        ]
      },
      {
        text: 'Dev Testing', items: [
          { text: 'Overview', link: '/testing/'},
          { text: 'Environments', link: '/testing/environments'},
          { text: 'Types of Tests', link: '/testing/types'},
          { text: 'XUnit Fixtures', link: '/testing/xunit-fixtures'}
        ]
      }
    ],

    sidebar: [
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jeffrygonzalez/site-services' }
    ]
  }
})
