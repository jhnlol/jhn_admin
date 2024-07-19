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
            moneyBank = xPlayer.getAccount("bank").money
        }

        cb(playerData)
    else
        cb(nil)
    end
end)
ESX.RegisterServerCallback('jhn_admin:kickPlayer', function(source, cb, playerId, reason)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if xPlayer.getGroup() == "admin" then
        DropPlayer(playerId, "Zostales wyrzucony z serwera. Powod: " .. reason..". Przez: " .. GetPlayerName(source))
        print("Player " .. playerId .. " has been kicked for reason: " .. reason)
        cb(true)
    else
        print("Player " .. source .. " tried to kick player " .. playerId .. " but doesn't have permission")
        cb(false)
    end
end)
RegisterServerEvent("jhn_admin:revivePlayer")
AddEventHandler("jhn_admin:revivePlayer", function(playerId)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if xPlayer.getGroup() == "admin" then
        TriggerClientEvent("esx_ambulancejob:revive", playerId)
        xPlayer.showNotification("Dostałeś revive od " .. GetPlayerName(source))
    else
        print("Player " .. source .. " tried to revive player " .. playerId .. " but doesn't have permission")
    end
end)