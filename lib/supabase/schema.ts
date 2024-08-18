import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const workspaces = pgTable('workspaces', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).notNull(),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
});

export const folders = pgTable('folders', {

    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).notNull(),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
    workspaceId:uuid('workspace_id').references(()=>workspaces.id,{onDelete:'cascade',

    }),

});

export const files = pgTable('files', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).notNull(),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
    workspaceId:uuid('workspace_id').references(()=>workspaces.id,{onDelete:'cascade',

    }),
    folderId:uuid('folder_id').references(()=>folders.id,{onDelete:'cascade',
})
});