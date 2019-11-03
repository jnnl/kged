import { fetchFurnitures } from 'api'

const initialState = {
    furnitures: fetchFurnitures(),
    activeFurniture: {}
}

function furnitures(state = initialState, action) {
    let attrs;

    switch (action.type) {
        case 'ADD_FURNITURE':
            return {
                ...state,
                furnitures: [
                    ...state.furnitures,
                    {
                        attrs: {
                            id: action.payload.furniture.name,
                            category: 'furniture',
                            url: 'assets/placeholders/furniture.jpg'
                        }
                    }
                ]
            }

        case 'UPDATE_FURNITURE':
            return {
                ...state,
                furnitures: state.furnitures.map(furniture =>
                    furniture.attrs.id === action.payload.oldId
                    ? { ...furniture, attrs: {
                        ...furniture.attrs,
                        id: action.payload.newId,
                        containerRoom: action.payload.containerRoom,
                        xValue: action.payload.xValue,
                        yValue: action.payload.yValue }
                    }
                    : furniture
                )
            }

        case 'DELETE_FURNITURE':
            attrs = action.payload.furniture.attrs;
            return {
                ...state,
                furnitures: state.furnitures.filter(furniture => furniture.attrs.id !== attrs.id)
            }

        case 'SET_ACTIVE_FURNITURE':
            return {
                ...state,
                activeFurniture: action.payload.furniture
            }

        case 'UPDATE_ACTIVE_FURNITURE':
            const fid = action.payload.id || state.activeFurniture.attrs.id
            return {
                ...state,
                activeFurniture: state.furnitures.find(r =>
                    r.attrs.id === fid
                )
            }

        case 'SET_FURNITURE_IMAGE':
            const {furnitureId, filePath, objectUrl} = action.payload;
            return {
                ...state,
                furnitures: state.furnitures.map(furn =>
                    furn.attrs.id === furnitureId
                    ? { ...furn, attrs: {...furn.attrs, src: filePath, url: objectUrl } }
                    : furn
                )
            }

        default:
            return state
    }
}

export default furnitures
