ESX = exports["es_extended"]:getSharedObject()

ESX.RegisterServerCallback("jhn_admin:openMenu", function(source, cb)
    local players = {}
    local xPlayers = ESX.GetPlayers()
    local xPlayer = ESX.GetPlayerFromId(source)
    local group = xPlayer.getGroup()
    local perms = Config.perms[group] or Config.perms["user"] 

    for _, playerId in ipairs(xPlayers) do
        local xPlayer = ESX.GetPlayerFromId(playerId)
        table.insert(players, {
            id = xPlayer.source,
            nick = GetPlayerName(xPlayer.source)
        })
    end
    
    cb(players, perms)
end)
ESX.RegisterServerCallback('jhn_admin:getPlayerData', function(source, cb, playerId)
    local xPlayer = ESX.GetPlayerFromId(playerId)

    if xPlayer then
        local playerData = {
            id = xPlayer.source, 
            nick = GetPlayerName(xPlayer.source), 
            name = xPlayer.getName(), 
            job = xPlayer.job.label, 
            money = xPlayer.getMoney(),
            moneyBank = xPlayer.getAccount("bank").money,
            group = xPlayer.getGroup()
        }

        cb(playerData)
    else
        cb(nil)
    end
end)
ESX.RegisterServerCallback('jhn_admin:kickPlayer', function(source, cb, playerId, reason)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if Config.perms[xPlayer.getGroup()].kick then
        DropPlayer(playerId, "Zostales wyrzucony z serwera. Powod: " .. reason..". Przez: " .. GetPlayerName(source))
        print("Player " .. playerId .. " has been kicked for reason: " .. reason)
    else
        print("Player " .. source .. " tried to kick player " .. playerId .. " but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:revivePlayer")
AddEventHandler("jhn_admin:revivePlayer", function(playerId)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].revive) then
        local xTarget = ESX.GetPlayerFromId(playerId)
        TriggerClientEvent("esx_ambulancejob:revive", playerId)
        xTarget.showNotification("Dostałeś revive od " .. GetPlayerName(source))
    else
        print("Player " .. source .. " tried to revive player " .. playerId .. " but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:healPlayer")
AddEventHandler("jhn_admin:healPlayer", function(playerId)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].heal) then
        local xTarget = ESX.GetPlayerFromId(playerId)
        TriggerClientEvent("esx_ambulancejob:heal", playerId)
        xTarget.showNotification("Dostałeś heal od " .. GetPlayerName(source))
    else
        print("Player " .. source .. " tried to heal player " .. playerId .. " but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:dmPlayer")
AddEventHandler("jhn_admin:dmPlayer", function(playerId, content)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].dm) then
        local xTarget = ESX.GetPlayerFromId(playerId)
        xTarget.showNotification("Wiadomość od " .. GetPlayerName(source) .. ": " .. content)
    else
        print("Player " .. source .. " tried to dm player " .. playerId .. " but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:sendAnnouncment")
AddEventHandler("jhn_admin:sendAnnouncment", function(content)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].announcment) then
        TriggerClientEvent('chatMessage', -1, "[Ogloszenie]", {255, 0, 0}, content)
    else
        print("Player " .. source .. " tried to send announcment but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:spawnPlayer")
AddEventHandler("jhn_admin:spawnPlayer", function(playerId)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].spawn) then
        local xTarget = ESX.GetPlayerFromId(playerId)
        xTarget.triggerEvent("jhn_admin:spawnPlayerClient")
        xTarget.showNotification("Zostałeś zespawnowany przez " .. GetPlayerName(source))
    else
        print("Player " .. source .. " tried to spawn player " .. playerId .. " but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:saveAll")
AddEventHandler("jhn_admin:saveAll", function()
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].saveAll) then
        ESX.SavePlayers()
        print("All players saved by " .. GetPlayerName(source))
        xPlayer.showNotification("SaveALl udany!")
    else
        print("Player " .. source .. " tried to save all players but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:tpPlayer")
AddEventHandler("jhn_admin:tpPlayer", function(playerId)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].tp) then
        local xTarget = ESX.GetPlayerFromId(playerId)
        xPlayer.setCoords(xTarget.getCoords())
    else
        print("Player " .. source .. " tried to teleport player " .. playerId .. " but doesn't have permission")
    end
end)
RegisterServerEvent("jhn_admin:bringPlayer")
AddEventHandler("jhn_admin:bringPlayer", function(playerId)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if (Config.perms[xPlayer.getGroup()].bring) then
        local xTarget = ESX.GetPlayerFromId(playerId)
        xTarget.setCoords(xPlayer.getCoords())
        xTarget.showNotification("Zostałeś przeteleportowany przez " .. GetPlayerName(source))
    else
        print("Player " .. source .. " tried to bring player " .. playerId .. " but doesn't have permission")
    end
end)