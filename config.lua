Config = {}
Config.perms = {
    ["admin"] = {
        openMenu = true,
        kick = true,
        dm = true,
        revive = true,
        heal = true,
        announcment = true,
        spawn = true,
    },
    ["superadmin"] = {
        openMenu = true,
        kick = true,
        dm = true,
        revive = true,
        heal = true,
        announcment = true,
        spawn = true,
    },
    ["user"] = {
        openMenu = false,
        kick = false,
        dm = false,
        revive = false,
        heal = false,
        announcment = false,
        spawn = true,
    },
}
Config.spawn = vector3(0, 0, 0)