ESX = exports["es_extended"]:getSharedObject()

RegisterCommand("admin_menu", function()
    ESX.TriggerServerCallback('jhn_admin:openMenu', function(players)
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = "setVisible",
            data = {
                players = players
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
    
    if not playerId or not reason then
        print("Invalid data received")
        return
    end
    
    ESX.TriggerServerCallback('jhn_admin:kickPlayer', function(result)
        if result then
            print("Player kicked successfully")
        else
            print("Failed to kick player")
        end
    end, playerId, reason)
end)
