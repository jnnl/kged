import { exportJSON } from 'utils'

export function fetchRooms() {
    const rooms = require('data/rooms.json')['rooms']
    return rooms
}

export function fetchFurnitures() {
    const rooms = fetchRooms()

    const furnitures = rooms.flatMap(room => {
        if (room.attrs && room.children) {
            return room.children.filter(c => c.attrs && c.attrs.category === 'furniture')
        }
    }).filter(f => f)

    return furnitures
}

export function fetchItems() {
    const items = require('data/items.json')
    return items
}

export function exportData(rooms, furnitures, items) {
    const dataObject = {rooms: rooms, furnitures: furnitures, items: items}
    console.log('EXPORT ROOMS', dataObject)
    exportJSON(dataObject, 'rooms.json')
}
