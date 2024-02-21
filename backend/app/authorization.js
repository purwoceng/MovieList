export const Role = {
    ADMIN: 'admin',
    USER: 'user'
}

export const Permission = {

    BROWSE_CINEMAS: 'browse_cinemas',
    READ_CINEMA: 'read_cinema',
    EDIT_CINEMA: 'edit_cinema',
    ADD_CINEMA: 'add_cinema',
    DELETE_CINEMA: 'delete_cinema',
    
    READ_USER: 'read_user',
    EDIT_USER: 'edit_user',

    BROWSE_WISHLIST: 'browse_wishlist',
    EDIT_WISHLIST: 'edit_wishlist',
    ADD_WISHLIST: 'add_wishlist',
    DELETE_WISHLIST: 'delete_wishlist',

    BROWSE_WATCHLIST: 'browse_watchlist',
    EDIT_WATCHLIST: 'edit_watchlist',
    ADD_WATCHLIST: 'add_watchlist',
    DELETE_WATCHLIST: 'delete_watchlist',
    
}

export const PermissionAssignment = {
    [Role.ADMIN]: [
        Permission.BROWSE_CINEMAS,
        Permission.READ_CINEMA,
        Permission.EDIT_CINEMA,
        Permission.ADD_CINEMA,
        Permission.DELETE_CINEMA,
    ],

    [Role.USER]: [
        Permission.BROWSE_WISHLIST,
        Permission.EDIT_WISHLIST,
        Permission.ADD_WISHLIST,
        Permission.DELETE_WISHLIST,

        Permission.BROWSE_WATCHLIST,
        Permission.EDIT_WATCHLIST,
        Permission.ADD_WATCHLIST,
        Permission.DELETE_WATCHLIST,

        Permission.READ_USER,
        Permission.EDIT_USER,

    ]
}