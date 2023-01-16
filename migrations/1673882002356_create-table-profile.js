exports.up = pgm => {
    pgm.createTable("profile", {
        user_id:{
            type: 'TEXT',
            notNull: true
        },
        name:{
            type: 'TEXT'
        },
        address:{
            type: 'TEXT'
        },
        phone_number:{
            type: 'TEXT'
        }
    })
};

exports.down = pgm => {
    pgm.dropTable("profile")
};
