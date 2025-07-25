export default {
  badge: "Badge",
  open: "Open",
  close: "Close",
  dismiss: "Dismiss",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel",
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items...",
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending.",
    },
    sortBy: "Sort by",
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}",
  },
  dateRangeInput: {
    divider: "to",
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates",
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date",
    },
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}",
    },
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today",
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}",
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)",
  },
  fileUpload: {
    title: "Drag and drop files here",
    divider: "or",
    browse: "Browse Files",
  },
  timePicker: {
    am: "AM",
    pm: "PM",
    title: "Select Time",
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page",
    },
  },
  stepper: {
    next: "Next",
    prev: "Previous",
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}",
    },
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more",
  },
  // custom
  save: "Save",
  delete: "Delete",
  rename: "Rename",
  name: "Name",
  submit: "Submit",
  settings: "Settings",
  login: "Login",
  logout: "Logout",
  edit: "Edit",
  actions: "Actions",
  import: "Import",
  enabled: "Enabled",
  disabled: "Disabled",


  loginComponent: {
    title: "Log into your account",
    username: "Username",
    password: "Password",
    remember: "Remember me",
    forgotPassword: "Forgot password?",
    donHaveAccount: "Don't have an account?",
    logIn: "Log In",
    signUp: "Sign up",
  },
  signUp: {
    title: "Register your account",
    back: "Back to login",
    steps: {
      account: {
        label: "Account",
        title: "Enter a username",
        username: "Username",
        nickname: "Nickname",
      },
      password: {
        label: "Password",
        title: "Set a password with a high security factor",
        subtitle:
          "Set a password with a high security factor <br> (using a combination of letters, numbers and symbols)",
        confirmPassword: "Confirm Password",
      },
      email: {
        label: "Email",
        title: "Add an auxiliary email address",
      },
      verification: {
        label: "Verification",
        title: "Verify the mailbox",
        submit: "Submit",
        sendCode: "Send Code",
      },
    },
  },
  forgotPassword: {
    title: "Forgot Password",
    back: "Back to login",
    steps: {
      email: {
        label: "Email",
        title: "Enter a email",
      },
      verification: {
        label: "Verification",
        title: "Verify Your Email",
        subtitle:
          "We sent a verification code to john..@gmail.com <br> Please check your email and paste the code below.",
        sendCode: "Send Code",
      },
      changePassword: {
        label: "Change Password",
        title: "Change Password",
        password: "Password",
        confirmPassword: "Confirm Password",
        submit: "Submit",
      },
    },
  },
  aippt: {
    title: "PPT Editor",
  },
  org: {
    manage: {
      title: "Update Orgs",
      subtitle: "Avoid excessive organizational structure and layers.",
      add: "Add Root",
      addChild: "Add Child",
      orgName: "Org Name",
      organizationCode: "Organization Code",
      deleteTitle: "Delete Org",
      deleteText:
        "Warning: You are about to perform irreversible data deletion. The selected data is permanently deleted and cannot be recovered. Carefully review the data you are deleting and confirm that you understand the consequences of this action. Are you sure you want to continue?",
      addOrg: "Add Org",
    },
  },
  roleComponent: {
    title: "Update Roles",
    subtitle:
      "By restricting the authorities of users, the risk of misoperation and malicious behavior can be reduced.",
    dialogTitle: "Setting role authorities",
    dialogSubheader: "Authorities",
    dialogTip:
      "* Modify role authorities carefully to avoid unpredictable errors.",
  },
  usersComponent: {
    title: "Users",
    subtitle: "Ensure the security and privacy of user data.",
    addUser: "Add User",
    updateUser: "Update User",
    batchUsers: "Batch Users",
    selectRole: "Select Role...",
    searchName: "Search Name...",
    form: {
      username: "Username",
      password: "Password",
      nickname: "Nickname",
      phone: "Phone",
      email: "Email",
      avatar: "Avatar (Url)",
    },
    deleteTitle: "Delete User",
    deleteSubtitle:
      "Warning: You are about to perform irreversible data deletion. The selected data is permanently deleted and cannot be recovered. Carefully review the data you are deleting and confirm that you understand the consequences of this action. Are you sure you want to continue?",
    repwdTitle: "Reset Password",
    repwdNewPassword: "New Password",
    repwdTip:
      "* Be careful to reset the password, you will not be able to login with the original password.",
  },
  batchUsersComponent: {
    title: "Batch Users Import",
    downloadTemplate: "Download The Template",
    status: {
      loading: "Loading",
      failure: "Failure",
      success: "Success",
    },
    headers: {
      nickname: "Nickname",
      username: "Username",
      password: "Password",
      phone: "Phone",
      email: "Email",
      status: "Status",
    },
  },
  selectionOrgsComponent: {
    title: "Selection Orgs",
  },
  selectionOrgsBtnComponent: {
    text: "Selection Orgs",
  },
  selectionUsersComponent: {
    title: "Selection Users",
    multipleChoiceTip: "Only one can be chosen.",
  },
  selectionUsersBtnComponent: {
    text: "Selection Users",
  },
};
