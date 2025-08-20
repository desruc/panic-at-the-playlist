# 🗄️ Database Setup Guide

This guide will help you set up PostgreSQL with Prisma for your wedding playlist app.

## 🚀 Quick Start (3 Options)

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL locally:**
   - **Windows:** Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS:** `brew install postgresql`
   - **Linux:** `sudo apt-get install postgresql postgresql-contrib`

2. **Start PostgreSQL service:**
   - **Windows:** Start from Services or use the installer
   - **macOS:** `brew services start postgresql`
   - **Linux:** `sudo systemctl start postgresql`

3. **Create database:**
   ```bash
   psql -U postgres
   CREATE DATABASE wedding_playlist;
   \q
   ```

4. **Set up environment:**
   - Copy `env.example` to `.env`
   - Update the DATABASE_URL with your credentials:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/wedding_playlist?schema=public"
   ```

### Option 2: Docker PostgreSQL (Easy & Portable)

1. **Run PostgreSQL in Docker:**
   ```bash
   docker run --name wedding-postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=wedding_playlist \
     -p 5432:5432 \
     -d postgres:15
   ```

2. **Set up environment:**
   - Copy `env.example` to `.env`
   - Use: `DATABASE_URL="postgresql://postgres:password@localhost:5432/wedding_playlist?schema=public"`

### Option 3: Cloud Database (Production Ready)

1. **Choose a provider:**
   - **Neon** (Free tier): [neon.tech](https://neon.tech)
   - **Supabase** (Free tier): [supabase.com](https://supabase.com)
   - **Railway** (Free tier): [railway.app](https://railway.app)

2. **Get connection string and add to `.env`**

## 🛠️ Setup Commands

Once your database is running:

1. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

2. **Push schema to database:**
   ```bash
   npm run db:push
   ```

3. **View data in Prisma Studio:**
   ```bash
   npm run db:studio
   ```

## 📁 File Structure

```
prisma/
└── schema.prisma      # Database schema definition

lib/
└── prisma.ts         # Prisma client instance

app/
├── api/songs/
│   └── route.ts      # API endpoints
├── page.tsx          # Main form
└── songs/page.tsx    # Songs list
```

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

## 🚨 Troubleshooting

### Common Issues:

1. **Connection refused:**
   - Make sure PostgreSQL is running
   - Check if port 5432 is available
   - Verify credentials in DATABASE_URL

2. **Database doesn't exist:**
   - Create the database: `CREATE DATABASE wedding_playlist;`

3. **Permission denied:**
   - Check user permissions in PostgreSQL
   - Make sure user has access to the database

### Useful Commands:

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Connect to database
psql -U postgres -d wedding_playlist

# List databases
\l

# List tables
\dt

# Exit psql
\q
```

## 🎯 Next Steps

1. **Test the app:** Run `npm run dev` and submit a song
2. **View data:** Run `npm run db:studio` to see your data
3. **Customize:** Modify the schema in `prisma/schema.prisma`
4. **Deploy:** Update DATABASE_URL for production

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Need help?** Check the console for error messages and make sure your database is running!
