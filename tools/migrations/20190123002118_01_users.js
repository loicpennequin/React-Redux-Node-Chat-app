exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments().primary();
        table.timestamps();
        table
            .string('username')
            .notNullable()
            .unique();
        table.string('slug').notNullable();
        table
            .string('email')
            .notNullable()
            .unique();
        table.string('password').notNullable();
        table.string('bio').nullable();
        table
            .integer('status')
            .notNullable()
            .defaultTo(0);
        table.integer('friends_count').defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
