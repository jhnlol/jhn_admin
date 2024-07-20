ESX = exports["es_extended"]:getSharedObject()

RegisterCommand("admin_menu", function()
    ESX.TriggerServerCallback('jhn_admin:openMenu', function(players, perms)
        if (not perms.openMenu) then 
            ESX.ShowNotification("You don't have permission to open this menu")
            return
        end
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = "setVisible",
            data = {
                players = players,
                perms = perms
            }
        })
    end)
end)

RegisterNUICallback("closeMenu", function(data, cb)
    SetNuiFocus(false, false)
    cb({})
end)

RegisterNuiCallback("getPlayerData", function(data, cb)
    ESX.TriggerServerCallback('jhn_admin:getPlayerData', function(playerData)
        cb(playerData)
    end, data[1])
end)
RegisterNuiCallback("kickPlayer", function(data, cb)
    local playerId = data[1]
    local reason = data[2]
    
    ESX.TriggerServerCallback('jhn_admin:kickPlayer', function(result)
        if result then
            print("Player kicked successfully")
        else
            print("Failed to kick player")
        end
    end, playerId, reason)
end)

RegisterNuiCallback("revivePlayer", function(data, cb)
    local playerId = data[1]
    TriggerServerEvent("jhn_admin:revivePlayer", playerId)
end)
RegisterNuiCallback("healPlayer", function(data, cb)
    local playerId = data[1]
    TriggerServerEvent("jhn_admin:healPlayer", playerId)
end)
RegisterNuiCallback("dmPlayer", function(data, cb)
    local playerId = data[1]
    local content = data[2]
    TriggerServerEvent("jhn_admin:dmPlayer", playerId, content)
end)
RegisterNuiCallback("sendAnnouncment", function(data, cb)
    local content = data[1]
    TriggerServerEvent("jhn_admin:sendAnnouncment", content)
end)
RegisterNuiCallback("spawnPlayer", function(data, cb)
    local playerId = data[1]
    TriggerServerEvent("jhn_admin:spawnPlayer", playerId)
end)
RegisterNuiCallback("saveAll", function(data, cb)
    TriggerServerEvent("jhn_admin:saveAll")
end)
RegisterNetEvent("jhn_admin:spawnPlayerClient")
AddEventHandler("jhn_admin:spawnPlayerClient", function()
    SetEntityCoords(PlayerPedId(), Config.spawn)
end)
RegisterNuiCallback("tpPlayer", function(data, cb)
    local playerId = data[1]
    TriggerServerEvent("jhn_admin:tpPlayer", playerId)
end)
RegisterNuiCallback("bringPlayer", function(data, cb)
    local playerId = data[1]
    TriggerServerEvent("jhn_admin:bringPlayer", playerId)
end)