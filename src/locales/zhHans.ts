export default {
  badge: "徽章",
  open: "打开",
  close: "关闭",
  dismiss: "解散",
  confirmEdit: {
    ok: "确定",
    cancel: "取消",
  },
  dataIterator: {
    noResultsText: "没有符合条件的结果",
    loadingText: "加载中……",
  },
  dataTable: {
    itemsPerPageText: "每页数目：",
    ariaLabel: {
      sortDescending: "：降序排列。",
      sortAscending: "：升序排列。",
      sortNone: "：未排序。",
      activateNone: "点击以移除排序。",
      activateDescending: "点击以降序排列。",
      activateAscending: "点击以升序排列。",
    },
    sortBy: "排序方式",
  },
  dataFooter: {
    itemsPerPageText: "每页数目：",
    itemsPerPageAll: "全部",
    nextPage: "下一页",
    prevPage: "上一页",
    firstPage: "首页",
    lastPage: "尾页",
    pageText: "{0}-{1} 共 {2}",
  },
  dateRangeInput: {
    divider: "至",
  },
  datePicker: {
    itemsSelected: "{0} 项已选择",
    range: {
      title: "选择日期",
      header: "输入日期",
    },
    title: "选择日期",
    header: "输入日期",
    input: {
      placeholder: "输入日期",
    },
  },
  noDataText: "没有数据",
  carousel: {
    prev: "上一张",
    next: "下一张",
    ariaLabel: {
      delimiter: "轮播图 {0} / {1}",
    },
  },
  calendar: {
    moreEvents: "还有 {0} 项",
    today: "今天",
  },
  input: {
    clear: "清除 {0}",
    prependAction: "{0} 前置操作",
    appendAction: "{0} 后置操作",
    otp: "请输入OTP字符 {0}",
  },
  fileInput: {
    counter: "{0} 个文件",
    counterSize: "{0} 个文件（共 {1}）",
  },
  fileUpload: {
    title: "在此处拖放文件",
    divider: "或",
    browse: "浏览文件",
  },
  timePicker: {
    am: "上午",
    pm: "下午",
    title: "选择时间",
  },
  pagination: {
    ariaLabel: {
      root: "分页导航",
      next: "下一页",
      previous: "上一页",
      page: "转到页面 {0}",
      currentPage: "当前页 {0}",
      first: "首页",
      last: "尾页",
    },
  },
  stepper: {
    next: "下一步",
    prev: "上一步",
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}",
    },
  },
  loading: "加载中...",
  infiniteScroll: {
    loadMore: "加载更多",
    empty: "没有更多了",
  },
  // custom
  save: "保存",
  delete: "删除",
  rename: "重命名",
  name: "名称",
  submit: "提交",
  settings: "设置",
  login: "登录 ",
  logout: "退出账户",
  edit: "编辑",
  actions: "操作",
  import: "导入",
  enabled: "启用",
  disabled: "禁用",

  loginComponent: {
    title: "登录你的账户",
    username: "用户名",
    password: "密码",
    remember: "记住账号",
    forgotPassword: "忘记密码?",
    donHaveAccount: "没有账号?",
    logIn: "登录",
    signUp: "注册",
  },
  signUp: {
    title: "注册您的帐户",
    back: "返回登录",
    steps: {
      account: {
        label: "账号",
        title: "输入用户名",
        username: "用户名",
        nickname: "昵称",
      },
      password: {
        label: "密码",
        title: "请设置高安全系数的密码",
        subtitle: "设置高安全系数的密码 <br>（使用字母、数字和符号的组合）",
        confirmPassword: "确认密码",
      },
      email: {
        label: "邮箱",
        title: "添加辅助电子邮件地址",
      },
      verification: {
        label: "验证",
        title: "验证邮箱",
        submit: "提交",
        sendCode: "发送验证码",
      },
    },
  },
  forgotPassword: {
    title: "忘记密码",
    back: "返回登录",
    steps: {
      email: {
        label: "邮箱",
        title: "输入邮箱",
      },
      verification: {
        label: "验证",
        title: "验证邮箱",
        subtitle:
          "我们发送了一个验证码到邮箱 <br> 请检查您的电子邮件并粘贴下面的代码。",
        sendCode: "发送验证码",
      },
      changePassword: {
        label: "更改密码",
        title: "更改密码",
        password: "密码",
        confirmPassword: "确认密码",
        submit: "提交",
      },
    },
  },
  aippt: {
    title: "PPT 编辑器",
  },
  org: {
    manage: {
      title: "修改组织",
      subtitle: "避免过多的组织架构和层级。",
      add: "添加根节点",
      addChild: "添加子节点",
      orgName: "组织名",
      organizationCode: "组织代码",
      deleteTitle: "删除组织",
      deleteText:
        "警告：您即将执行不可逆的数据删除操作。所选数据将被永久删除且无法恢复。请仔细查看您要删除的数据，并确认您了解此操作的后果。您确定要继续吗？",
      addOrg: "添加组织",
    },
  },

  roleComponent: {
    title: "更新角色",
    subtitle: "通过限制用户的权限，可以降低误操作和恶意行为的风险。",
    dialogTitle: "设置角色权限",
    dialogSubheader: "权限",
    dialogTip: "* 谨慎修改角色权限，以免出现不可预测的错误。",
  },
  usersComponent: {
    title: "用户管理",
    subtitle: "确保用户数据的安全性和隐私性。",
    addUser: "添加用户",
    updateUser: "修改用户",
    batchUsers: "批量导入用户",
    selectRole: "选择角色...",
    searchName: "检索名称...",
    form: {
      username: "用户名",
      password: "密码",
      nickname: "昵称",
      phone: "手机号",
      email: "电子邮箱",
      avatar: "头像 (Url)",
    },
    deleteTitle: "删除用户",
    deleteSubtitle:
      "警告：您即将执行不可逆的数据删除操作。所选数据将被永久删除且无法恢复。请仔细检查您要删除的数据，并确认您清楚此操作的后果。你确定要继续吗？",
    repwdTitle: "重置密码",
    repwdNewPassword: "新密码",
    repwdTip: "* 请注意重新设置密码，您将无法使用原密码登录。",
  },
  batchUsersComponent: {
    title: "批量用户导入",
    downloadTemplate: "下载模板",
    status: {
      loading: "加载中",
      failure: "失败",
      success: "成功",
    },
    headers: {
      nickname: "昵称",
      username: "用户名",
      password: "密码",
      phone: "手机号",
      email: "电子邮箱",
      status: "状态",
    },
  },
  selectionOrgsComponent: {
    title: "选择组织",
  },
  selectionOrgsBtnComponent: {
    text: "选择组织",
  },
  selectionUsersComponent: {
    title: "选择用户",
    multipleChoiceTip: "只能选择一人。",
  },
  selectionUsersBtnComponent: {
    text: "选择用户",
  },
};
