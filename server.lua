ESX = exports["es_extended"]:getSharedObject()

ESX.RegisterServerCallback("jhn_admin:openMenu", function(source, cb)
    local players = {}
    local xPlayers = ESX.GetPlayers()

    for _, playerId in ipairs(xPlayers) do
        local xPlayer = ESX.GetPlayerFromId(playerId)
        table.insert(players, {
            id = xPlayer.source,
            nick = GetPlayerName(xPlayer.source)
        })
    end
    cb(players)
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
