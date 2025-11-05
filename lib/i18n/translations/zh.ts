import { Translations } from '../types'

// Chinese translations
export const ZH_TRANSLATIONS: Translations = {
  nav: {
    home: '首页',
    services: '服务',
    about: '关于我们',
    'case-studies': '案例研究',
    portfolio: '项目案例',
    testimonials: '客户评价',
    contact: '联系我们',
  },
  common: {
    loading: '加载中...',
    error: '发生错误',
    retry: '重试',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    close: '关闭',
    confirm: '确认',
    yes: '是',
    no: '否',
    next: '下一页',
    previous: '上一页',
    submit: '提交',
    reset: '重置',
    search: '搜索',
    language: '语言',
    switchLanguage: '切换语言',
  },
  services: {
    title: '我们的服务',
    subtitle: '为您的业务需求量身定制的专业IT咨询服务',
    fullStackDev: '全栈开发',
    fullStackDevDesc:
      '使用现代技术和最佳实践进行端到端的Web和移动应用程序开发。',
    cloudSolutions: '云解决方案',
    cloudSolutionsDesc: '为现代应用程序提供可扩展的云架构和部署解决方案。',
    consulting: 'IT咨询',
    consultingDesc: '战略技术指导，帮助您的企业发展和优化运营。',
    features: '功能特性',
    technologies: '技术栈',
    services: {
      fullStackDevelopment: {
        title: '全栈开发',
        description:
          '使用现代技术和最佳实践进行端到端的Web和移动应用程序开发。',
        features: {
          frontendDevelopment: '响应式前端开发',
          backendDevelopment: '可扩展的后端架构',
          databaseDesign: '数据库设计和优化',
          apiDevelopment: 'RESTful和GraphQL API开发',
          performanceOptimization: '性能优化',
          codeReview: '代码审查和重构',
        },
      },
      cloudSolutions: {
        title: '云解决方案',
        description: '为现代应用程序提供可扩展的云架构和部署解决方案。',
        features: {
          cloudMigration: '云迁移策略',
          infrastructureAsCode: '基础设施即代码',
          containerization: '使用Docker和Kubernetes的容器化',
          serverlessArchitecture: '无服务器架构',
          cloudSecurityAndCompliance: '云安全和合规',
          costOptimization: '成本优化',
        },
      },
      teamAugmentation: {
        title: '团队扩充',
        description:
          '通过我们熟练的开发人员和顾问扩展您的团队，加速您的项目进展。',
        features: {
          skillGapFilling: '填补您团队的技能差距',
          flexibleResourcing: '灵活的资源模型',
          seamlessIntegration: '与您的团队无缝集成',
          knowledgeTransfer: '知识转移',
          agileMethodology: '敏捷方法论专业知识',
          scalabilityAndFlexibility: '可扩展性和灵活性',
        },
      },
      enterpriseSolutions: {
        title: '企业解决方案',
        description: '为解决复杂业务挑战而设计的定制企业解决方案。',
        features: {
          digitalTransformation: '数字化转型',
          legacySystemModernization: '传统系统现代化',
          enterpriseArchitecture: '企业架构',
          customWorkflows: '自定义工作流和自动化',
          systemIntegration: '系统集成',
          dataMigration: '数据迁移和ETL',
        },
      },
    },
  },
  about: {
    title: '关于BestIT咨询',
    subtitle: '您值得信赖的数字化转型合作伙伴',
    description:
      '我们是一个经验丰富的开发人员和顾问团队，致力于帮助企业利用技术实现增长和成功。',
    mission: '我们的使命',
    missionDesc: '提供创新、可靠且具有成本效益的IT解决方案，推动业务成功。',
    vision: '我们的愿景',
    visionDesc: '成为通过技术改变企业的领先IT咨询公司。',
    values: '我们的价值观',
    valuesDesc: '创新、可靠、透明和客户成功。',
  },
  portfolio: {
    title: '我们的作品集',
    subtitle: '展示我们成功的项目和客户成就',
    viewProject: '查看项目',
    projectDetails: '项目详情',
    technologies: '使用的技术',
    category: '类别',
  },
  testimonials: {
    title: '客户评价',
    subtitle: '我们的客户对与我们合作的评价',
    clientReview: '客户评论',
  },
  contact: {
    title: '联系我们',
    subtitle: '与我们的团队取得联系',
    name: '姓名',
    email: '邮箱',
    message: '留言',
    send: '发送消息',
    phone: '电话',
    address: '地址',
    office: '办公室',
  },
  errors: {
    notFound: '页面未找到',
    serverError: '服务器错误',
    unauthorized: '未授权访问',
    forbidden: '访问被禁止',
    validationError: '验证错误',
    networkError: '网络错误',
  },
  meta: {
    siteTitle: 'BestIT咨询 - 专业IT服务',
    siteDescription: '专业IT咨询服务，包括全栈开发、云解决方案和战略技术指导。',
    homeTitle: '首页 - BestIT咨询',
    servicesTitle: '服务 - BestIT咨询',
    aboutTitle: '关于我们 - BestIT咨询',
    portfolioTitle: '项目案例 - BestIT咨询',
    testimonialsTitle: '客户评价 - BestIT咨询',
    contactTitle: '联系我们 - BestIT咨询',
  },
  home: {
    hero: {
      title: '精英软件开发与IT咨询',
      subtitle: '今天构建明天的技术解决方案',
      description: '我们通过专业的软件开发和IT咨询服务帮助企业进行技术转型。',
      cta: '立即开始',
      learnMore: '了解更多',
    },
    services: {
      title: '我们的服务',
      subtitle: '为您的业务提供全面的IT解决方案',
      viewAll: '查看所有服务',
    },
    about: {
      title: '为什么选择我们',
      subtitle: '我们在所有工作中都追求卓越',
      points: {
        expertise: {
          title: '技术专长',
          description:
            '我们的团队由高技能的开发人员和顾问组成，他们在多种技术领域拥有深厚的专业知识。',
        },
        quality: {
          title: '质量保证',
          description:
            '我们通过严格的测试和代码审查确保所有交付成果的最高质量。',
        },
        communication: {
          title: '清晰沟通',
          description: '我们在整个项目生命周期中保持透明和一致的沟通。',
        },
        delivery: {
          title: '按时交付',
          description: '我们尊重截止日期，确保项目按时按预算交付。',
        },
      },
    },

    cta: {
      title: '准备好转变您的业务了吗？',
      description: '立即联系我们，讨论如何帮助您实现技术目标。',
      button: '联系我们',
    },
  },
  footer: {
    companyDescription: '从温哥华到亚洲的精英软件开发外包。',
    services: '服务',
    servicesList: {
      fullStack: '全栈开发',
      cloud: '云解决方案',
      team: '团队扩充',
      enterprise: '企业解决方案',
    },
    technologies: '技术',
    techList: {
      react: 'React 和 Next.js',
      node: 'Node.js 和 TypeScript',
      python: 'Python 和 Java',
      cloud: '云平台',
    },
    followUs: '关注我们',
    rights: '版权所有',
    privacy: '隐私政策',
    terms: '服务条款',
  },
}
