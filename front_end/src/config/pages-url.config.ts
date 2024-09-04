class DASHBOARD {
    private root = '/me'

    HOME = this.root
    MYPROFILE = `${this.root}/myprofile/acts`
    PROFILE = `${this.root}/profile`
    SETTINGS = `${this.root}/myprofile/settings`
    NEWACT = `${this.root}/addnew`
}

export const DASHBOARD_PAGES = new DASHBOARD()