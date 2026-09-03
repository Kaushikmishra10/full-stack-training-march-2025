# restaurant_rms.py
"""
DineMaster - Restaurant Management System (Tkinter + SQLite)
Save as restaurant_rms.py and run: python restaurant_rms.py
Default login -> admin / admin
"""

import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
import sqlite3
import datetime
import csv
import os
from typing import Any, List, Optional, Tuple

DB_FILE = "restaurant.db"
TAX_PERCENT = 5.0        # default tax percent
TOTAL_TABLES = 12        # number of tables in restaurant (used in dashboard)

# ---------------------------
# Database helpers
# ---------------------------
def init_db():
    """
    Create DB schema. If `menu` table exists but lacks `description` column,
    alter it to add the column. Seed admin & sample menu items only if menu empty.
    """
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()

    # users
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE,
                    password TEXT,
                    role TEXT
                )''')

    # create menu table with description column (if missing we will add)
    c.execute('''CREATE TABLE IF NOT EXISTS menu (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    category TEXT,
                    price REAL
                )''')

    # check if description column exists; if not, add it
    c.execute("PRAGMA table_info(menu)")
    cols = [row[1] for row in c.fetchall()]  # row[1] is column name
    if "description" not in cols:
        try:
            c.execute("ALTER TABLE menu ADD COLUMN description TEXT")
        except sqlite3.OperationalError:
            # If alter fails for any reason (rare), ignore (table might be locked)
            pass

    # table bookings
    c.execute('''CREATE TABLE IF NOT EXISTS bookings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    table_no INTEGER,
                    customer TEXT,
                    pax INTEGER,
                    time TEXT,
                    status TEXT
                )''')

    # orders
    c.execute('''CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    table_no INTEGER,
                    items TEXT,
                    total REAL,
                    status TEXT,
                    created_at TEXT
                )''')

    # sales record
    c.execute('''CREATE TABLE IF NOT EXISTS sales (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER,
                    total REAL,
                    created_at TEXT
                )''')

    # seed admin
    c.execute("SELECT 1 FROM users WHERE username='admin' LIMIT 1")
    if not c.fetchone():
        c.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                  ('admin', 'admin', 'admin'))

    # seed sample menu items only if menu empty
    c.execute("SELECT COUNT(1) FROM menu")
    menu_count = c.fetchone()[0] if c.fetchone else None
    # Re-run safely: fetch one directly
    c.execute("SELECT COUNT(1) FROM menu")
    menu_count = c.fetchone()[0]
    if menu_count == 0:
        sample_items = [
            ("Margherita Pizza", "Pizza", 199, "Cheese and tomato classic pizza"),
            ("Farm House Pizza", "Pizza", 299, "Loaded with vegetables"),
            ("Paneer Butter Masala", "Main Course", 249, "Creamy tomato-based paneer gravy"),
            ("Chicken Biryani", "Main Course", 299, "Spicy aromatic chicken biryani"),
            ("Egg Curry", "Main Course", 159, "Boiled eggs cooked in spicy gravy"),
            ("Masala Dosa", "South Indian", 120, "Crispy dosa with aloo masala"),
            ("Idli Sambar", "South Indian", 80, "Soft idlis with sambar & chutney"),
            ("Veg Burger", "Fast Food", 110, "Crispy patty with lettuce & sauce"),
            ("Chicken Burger", "Fast Food", 150, "Juicy chicken patty burger"),
            ("Cold Coffee", "Beverages", 99, "Chilled creamy cold coffee"),
            ("Masala Tea", "Beverages", 20, "Spiced Indian tea"),
            ("Fresh Lime Soda", "Beverages", 50, "Sweet or salted lime soda"),
            ("Chocolate Ice Cream", "Dessert", 70, "Delicious chocolate scoop"),
            ("Gulab Jamun", "Dessert", 60, "Soft hot sweet balls")
        ]
        c.executemany("INSERT INTO menu (name, category, price, description) VALUES (?,?,?,?)", sample_items)

    conn.commit()
    conn.close()


def run_query(query: str, params: Tuple = (), fetchone: bool = False, fetchall: bool = False,
              return_lastrowid: bool = False) -> Any:
    """
    Execute a query and optionally return fetchone/fetchall or lastrowid.
    Note: lastrowid works for the same connection used for the insert.
    """
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute(query, params)
    data = None
    if fetchone:
        data = c.fetchone()
    if fetchall:
        data = c.fetchall()
    if return_lastrowid:
        last = c.lastrowid
        conn.commit()
        conn.close()
        return last
    conn.commit()
    conn.close()
    return data

# ---------------------------
# Application
# ---------------------------
class RMSApp:
    def __init__(self, root: tk.Tk):
        self.root = root
        root.title("DineMaster - Restaurant Management")
        root.geometry("1000x650")
        self.current_user: Optional[str] = None
        self.role: Optional[str] = None
        self.login_frame: Optional[ttk.Frame] = None
        # Build login page initially
        self.build_login()

    # ---------- Login ----------
    def build_login(self):
        self.clear_root()
        # create fresh frame each time
        self.login_frame = ttk.Frame(self.root, padding=20)
        f = self.login_frame
        f.pack(fill=tk.BOTH, expand=True)

        ttk.Label(f, text="DineMaster Login", font=("Helvetica", 20, "bold")).pack(pady=10)
        frm = ttk.Frame(f)
        frm.pack(pady=10)

        ttk.Label(frm, text="Username:").grid(row=0, column=0, sticky=tk.W, padx=5, pady=5)
        self.user_entry = ttk.Entry(frm)
        self.user_entry.grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(frm, text="Password:").grid(row=1, column=0, sticky=tk.W, padx=5, pady=5)
        self.pass_entry = ttk.Entry(frm, show="*")
        self.pass_entry.grid(row=1, column=1, padx=5, pady=5)

        btn = ttk.Button(f, text="Login", command=self.login)
        btn.pack(pady=10)

        note = ttk.Label(f, text="Default admin: admin / admin", foreground="gray")
        note.pack(pady=5)

    def login(self):
        u = self.user_entry.get().strip()
        p = self.pass_entry.get().strip()
        if not u or not p:
            messagebox.showwarning("Login", "Enter username and password.")
            return
        row = run_query("SELECT username, role FROM users WHERE username=? AND password=?", (u, p), fetchone=True)
        if row:
            self.current_user = row[0]
            self.role = row[1]
            self.build_dashboard()
        else:
            messagebox.showerror("Login failed", "Invalid username or password.")

    # ---------- Utilities ----------
    def clear_root(self):
        """Destroy all widgets under root to clean the screen."""
        for w in self.root.winfo_children():
            try:
                w.pack_forget()
                w.grid_forget()
            except Exception:
                pass
            try:
                w.destroy()
            except Exception:
                pass

    def header(self, parent: ttk.Frame, title: str) -> ttk.Frame:
        top = ttk.Frame(parent)
        top.pack(fill=tk.X, pady=8)
        ttk.Label(top, text=title, font=("Helvetica", 16, "bold")).pack(side=tk.LEFT)
        ttk.Label(top, text=f"User: {self.current_user}", foreground="gray").pack(side=tk.RIGHT)
        return top

    # ---------- Dashboard ----------
    def build_dashboard(self):
        self.clear_root()
        self.main_frame = ttk.Frame(self.root, padding=10)
        self.main_frame.pack(fill=tk.BOTH, expand=True)

        self.header(self.main_frame, "DineMaster Dashboard")

        # quick stats
        stats_frm = ttk.Frame(self.main_frame)
        stats_frm.pack(fill=tk.X, pady=10)

        total_tables = TOTAL_TABLES
        orders_today_row = run_query("SELECT COUNT(1) FROM orders WHERE date(created_at)=date('now')", fetchone=True)
        orders_today = orders_today_row[0] if orders_today_row and orders_today_row[0] else 0
        revenue_today_row = run_query("SELECT SUM(total) FROM sales WHERE date(created_at)=date('now')", fetchone=True)
        revenue_today = revenue_today_row[0] if revenue_today_row and revenue_today_row[0] else 0.0

        ttk.Label(stats_frm, text=f"Tables: {total_tables}", padding=8, relief=tk.RIDGE).pack(side=tk.LEFT, padx=6)
        ttk.Label(stats_frm, text=f"Orders today: {orders_today}", padding=8, relief=tk.RIDGE).pack(side=tk.LEFT, padx=6)
        ttk.Label(stats_frm, text=f"Revenue today: ₹{revenue_today:.2f}", padding=8, relief=tk.RIDGE).pack(side=tk.LEFT, padx=6)

        btns = ttk.Frame(self.main_frame)
        btns.pack(pady=10)

        ttk.Button(btns, text="Manage Menu", command=self.manage_menu).grid(row=0, column=0, padx=6, pady=6)
        ttk.Button(btns, text="Table Booking", command=self.manage_bookings).grid(row=0, column=1, padx=6, pady=6)
        ttk.Button(btns, text="Take Order", command=self.take_order).grid(row=0, column=2, padx=6, pady=6)
        ttk.Button(btns, text="Kitchen Panel", command=self.kitchen_panel).grid(row=0, column=3, padx=6, pady=6)
        ttk.Button(btns, text="Daily Sales Report", command=self.daily_sales_report).grid(row=0, column=4, padx=6, pady=6)
        ttk.Button(btns, text="Logout", command=self.logout).grid(row=0, column=5, padx=6, pady=6)

        # show menu quick view
        self.menu_quick = ttk.Treeview(self.main_frame, columns=("id", "name", "category", "price"), show="headings", height=12)
        for col, w in [("id", 50), ("name", 250), ("category", 120), ("price", 100)]:
            self.menu_quick.heading(col, text=col.title())
            self.menu_quick.column(col, width=w)
        self.menu_quick.pack(fill=tk.BOTH, expand=True, pady=10)
        self.refresh_menu_tree(self.menu_quick)

    def logout(self):
        self.current_user = None
        self.build_login()

    # ---------- Menu Management ----------
    def manage_menu(self):
        self.clear_root()
        frame = ttk.Frame(self.root, padding=10)
        frame.pack(fill=tk.BOTH, expand=True)
        self.header(frame, "Menu Management")

        left = ttk.Frame(frame)
        left.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=6)

        self.menu_tree = ttk.Treeview(left, columns=("id", "name", "category", "price"), show="headings", selectmode="browse")
        for col, w in [("id", 50), ("name", 250), ("category", 120), ("price", 100)]:
            self.menu_tree.heading(col, text=col.title())
            self.menu_tree.column(col, width=w)
        self.menu_tree.pack(fill=tk.BOTH, expand=True)

        right = ttk.Frame(frame, width=300)
        right.pack(side=tk.RIGHT, fill=tk.Y, padx=6)

        # Entry fields
        ttk.Label(right, text="Name:").pack(anchor=tk.W, pady=4)
        self.m_name = ttk.Entry(right)
        self.m_name.pack(fill=tk.X, pady=4)
        ttk.Label(right, text="Category:").pack(anchor=tk.W, pady=4)
        self.m_cat = ttk.Entry(right)
        self.m_cat.pack(fill=tk.X, pady=4)
        ttk.Label(right, text="Price:").pack(anchor=tk.W, pady=4)
        self.m_price = ttk.Entry(right)
        self.m_price.pack(fill=tk.X, pady=4)
        ttk.Label(right, text="Description:").pack(anchor=tk.W, pady=4)
        self.m_desc = ttk.Entry(right)
        self.m_desc.pack(fill=tk.X, pady=4)

        ttk.Button(right, text="Add Item", command=self.add_menu_item).pack(fill=tk.X, pady=6)
        ttk.Button(right, text="Update Selected", command=self.update_menu_item).pack(fill=tk.X, pady=6)
        ttk.Button(right, text="Delete Selected", command=self.delete_menu_item).pack(fill=tk.X, pady=6)
        ttk.Button(right, text="Back", command=self.build_dashboard).pack(fill=tk.X, pady=12)

        self.refresh_menu_tree(self.menu_tree)

    def refresh_menu_tree(self, tree: ttk.Treeview):
        for i in tree.get_children():
            tree.delete(i)
        rows = run_query("SELECT id, name, category, price FROM menu ORDER BY category, name", fetchall=True) or []
        for r in rows:
            tree.insert('', tk.END, values=r)

    def add_menu_item(self):
        name = self.m_name.get().strip()
        cat = self.m_cat.get().strip() or "Uncategorized"
        desc = self.m_desc.get().strip()
        try:
            price = float(self.m_price.get())
        except Exception:
            messagebox.showerror("Error", "Price must be a number.")
            return
        if not name:
            messagebox.showwarning("Validation", "Enter item name.")
            return
        run_query("INSERT INTO menu (name, category, price, description) VALUES (?,?,?,?)",
                  (name, cat, price, desc))
        messagebox.showinfo("Success", "Menu item added.")
        self.m_name.delete(0, tk.END); self.m_cat.delete(0, tk.END); self.m_price.delete(0, tk.END); self.m_desc.delete(0, tk.END)
        self.refresh_menu_tree(self.menu_tree)

    def update_menu_item(self):
        sel = self.menu_tree.selection()
        if not sel:
            messagebox.showwarning("Select", "Select an item to update.")
            return
        item = self.menu_tree.item(sel[0])['values']
        item_id = item[0]
        name = self.m_name.get().strip() or item[1]
        cat = self.m_cat.get().strip() or item[2]
        try:
            price = float(self.m_price.get()) if self.m_price.get().strip() else float(item[3])
        except Exception:
            messagebox.showerror("Error", "Price must be a number.")
            return
        desc_row = run_query("SELECT description FROM menu WHERE id=?", (item_id,), fetchone=True)
        existing_desc = desc_row[0] if desc_row and desc_row[0] else ""
        desc = self.m_desc.get().strip() or existing_desc
        run_query("UPDATE menu SET name=?, category=?, price=?, description=? WHERE id=?", (name, cat, price, desc, item_id))
        messagebox.showinfo("Success", "Menu item updated.")
        self.refresh_menu_tree(self.menu_tree)

    def delete_menu_item(self):
        sel = self.menu_tree.selection()
        if not sel:
            messagebox.showwarning("Select", "Select an item to delete.")
            return
        item = self.menu_tree.item(sel[0])['values']
        if messagebox.askyesno("Confirm", f"Delete '{item[1]}' ?"):
            run_query("DELETE FROM menu WHERE id=?", (item[0],))
            self.refresh_menu_tree(self.menu_tree)

    # ---------- Bookings ----------
    def manage_bookings(self):
        self.clear_root()
        frame = ttk.Frame(self.root, padding=10)
        frame.pack(fill=tk.BOTH, expand=True)
        self.header(frame, "Table Booking")

        left = ttk.Frame(frame)
        left.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=6)
        self.book_tree = ttk.Treeview(left, columns=("id", "table", "customer", "pax", "time", "status"), show="headings")
        for col,w in [("id",50),("table",80),("customer",180),("pax",60),("time",160),("status",100)]:
            self.book_tree.heading(col, text=col.title())
            self.book_tree.column(col, width=w)
        self.book_tree.pack(fill=tk.BOTH, expand=True)

        right = ttk.Frame(frame, width=280)
        right.pack(side=tk.RIGHT, fill=tk.Y, padx=6)
        ttk.Label(right, text=f"Table No (1 - {TOTAL_TABLES}):").pack(anchor=tk.W, pady=4)
        self.b_table = ttk.Entry(right)
        self.b_table.pack(fill=tk.X, pady=4)
        ttk.Label(right, text="Customer:").pack(anchor=tk.W, pady=4)
        self.b_customer = ttk.Entry(right)
        self.b_customer.pack(fill=tk.X, pady=4)
        ttk.Label(right, text="Pax:").pack(anchor=tk.W, pady=4)
        self.b_pax = ttk.Entry(right)
        self.b_pax.pack(fill=tk.X, pady=4)

        ttk.Button(right, text="Book Table", command=self.book_table).pack(fill=tk.X, pady=6)
        ttk.Button(right, text="Mark Free", command=self.free_table).pack(fill=tk.X, pady=6)
        ttk.Button(right, text="Back", command=self.build_dashboard).pack(fill=tk.X, pady=12)

        self.refresh_bookings()

    def book_table(self):
        try:
            tno = int(self.b_table.get())
            if not (1 <= tno <= TOTAL_TABLES):
                raise ValueError("Table out of range")
        except Exception:
            messagebox.showerror("Error", f"Table number must be integer between 1 and {TOTAL_TABLES}.")
            return
        cust = self.b_customer.get().strip() or "Guest"
        try:
            pax = int(self.b_pax.get()) if self.b_pax.get().strip() else 1
        except Exception:
            messagebox.showerror("Error", "Pax must be integer.")
            return
        time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        run_query("INSERT INTO bookings (table_no, customer, pax, time, status) VALUES (?,?,?,?,?)", (tno, cust, pax, time, "booked"))
        messagebox.showinfo("Booked", f"Table {tno} booked.")
        self.b_table.delete(0, tk.END); self.b_customer.delete(0, tk.END); self.b_pax.delete(0, tk.END)
        self.refresh_bookings()

    def free_table(self):
        sel = self.book_tree.selection()
        if not sel:
            messagebox.showwarning("Select", "Select booking to free.")
            return
        item = self.book_tree.item(sel[0])['values']
        run_query("DELETE FROM bookings WHERE id=?", (item[0],))
        messagebox.showinfo("Freed", "Booking removed.")
        self.refresh_bookings()

    def refresh_bookings(self):
        for i in self.book_tree.get_children():
            self.book_tree.delete(i)
        rows = run_query("SELECT id, table_no, customer, pax, time, status FROM bookings ORDER BY time DESC", fetchall=True) or []
        for r in rows:
            self.book_tree.insert('', tk.END, values=r)

    # ---------- Orders & Billing ----------
    def take_order(self):
        self.clear_root()
        frame = ttk.Frame(self.root, padding=10)
        frame.pack(fill=tk.BOTH, expand=True)
        self.header(frame, "Take Order / Billing")

        left = ttk.Frame(frame)
        left.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=6)

        menu_list = run_query("SELECT id, name, category, price FROM menu ORDER BY category, name", fetchall=True) or []
        self.menu_items = {str(r[0]): (r[1], r[3]) for r in menu_list}  # id -> (name, price)

        self.items_tree = ttk.Treeview(left, columns=("id", "name", "price"), show="headings", height=15)
        for col,w in [("id",60),("name",300),("price",120)]:
            self.items_tree.heading(col, text=col.title())
            self.items_tree.column(col, width=w)
        self.items_tree.pack(fill=tk.BOTH, expand=True)
        for r in menu_list:
            self.items_tree.insert('', tk.END, values=r)

        middle = ttk.Frame(frame, width=220)
        middle.pack(side=tk.LEFT, fill=tk.Y, padx=6)
        ttk.Label(middle, text="Selected Items").pack()
        self.cart_tree = ttk.Treeview(middle, columns=("name","qty","price"), show="headings", height=12)
        for col,w in [("name",200),("qty",60),("price",100)]:
            self.cart_tree.heading(col, text=col.title())
            self.cart_tree.column(col, width=w)
        self.cart_tree.pack()

        bt_frame = ttk.Frame(middle)
        bt_frame.pack(pady=6)
        ttk.Button(bt_frame, text="Add ->", command=self.add_to_cart).grid(row=0,column=0,padx=3,pady=3)
        ttk.Button(bt_frame, text="<- Remove", command=self.remove_from_cart).grid(row=0,column=1,padx=3,pady=3)
        ttk.Button(bt_frame, text="Clear Cart", command=lambda: [self.cart_tree.delete(i) for i in self.cart_tree.get_children()]).grid(row=1,column=0,columnspan=2,pady=3)

        right = ttk.Frame(frame)
        right.pack(side=tk.RIGHT, fill=tk.Y, padx=6)
        ttk.Label(right, text="Table No:").pack(anchor=tk.W, pady=4)
        self.order_table = ttk.Entry(right)
        self.order_table.pack(fill=tk.X, pady=4)
        ttk.Label(right, text=f"Tax % (default {TAX_PERCENT}):").pack(anchor=tk.W, pady=4)
        self.order_tax = ttk.Entry(right)
        self.order_tax.insert(0, str(TAX_PERCENT))
        self.order_tax.pack(fill=tk.X, pady=4)

        ttk.Button(right, text="Generate Bill", command=self.generate_bill).pack(fill=tk.X, pady=6)
        ttk.Button(right, text="Back", command=self.build_dashboard).pack(fill=tk.X, pady=12)

    def add_to_cart(self):
        sel = self.items_tree.selection()
        if not sel:
            messagebox.showwarning("Select", "Select an item first.")
            return
        item = self.items_tree.item(sel[0])['values']  # id, name, category, price
        qty = simpledialog.askinteger("Quantity", f"Quantity for {item[1]}:", minvalue=1, initialvalue=1, parent=self.root)
        if not qty:
            return
        # if already in cart, increment
        for iid in self.cart_tree.get_children():
            vals = self.cart_tree.item(iid)['values']
            if vals[0] == item[1]:
                new_qty = vals[1] + qty
                new_price = new_qty * float(item[3])
                self.cart_tree.item(iid, values=(vals[0], new_qty, f"{new_price:.2f}"))
                return
        total_price = qty * float(item[3])
        self.cart_tree.insert('', tk.END, values=(item[1], qty, f"{total_price:.2f}"))

    def remove_from_cart(self):
        sel = self.cart_tree.selection()
        if not sel:
            messagebox.showwarning("Select", "Select an item in cart.")
            return
        self.cart_tree.delete(sel[0])

    def generate_bill(self):
        table_no = self.order_table.get().strip()
        if not table_no or not table_no.isdigit():
            messagebox.showerror("Table No", "Enter a valid table number.")
            return
        items = []
        subtotal = 0.0
        for iid in self.cart_tree.get_children():
            name, qty, price = self.cart_tree.item(iid)['values']
            qty = int(qty)
            price_val = float(price)
            unit = price_val / qty if qty else 0
            items.append((name, qty, unit, price_val))
            subtotal += price_val
        if not items:
            messagebox.showwarning("Empty", "Cart is empty.")
            return
        try:
            tax_percent = float(self.order_tax.get())
        except Exception:
            messagebox.showerror("Tax", "Enter a valid tax percent.")
            return
        tax_amt = subtotal * (tax_percent/100.0)
        total = subtotal + tax_amt

        # Save order (use return_lastrowid to get order id reliably)
        items_str = ";".join([f"{i[0]}|{i[1]}|{i[2]:.2f}|{i[3]:.2f}" for i in items])
        created_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        run_query("INSERT INTO orders (table_no, items, total, status, created_at) VALUES (?,?,?,?,?)",
                  (int(table_no), items_str, total, "pending", created_at))
        # retrieving last inserted order id — safer to open new connection and query last row in orders table
        order_row = run_query("SELECT id FROM orders ORDER BY id DESC LIMIT 1", fetchone=True)
        order_id = order_row[0] if order_row else None

        # Save sales record
        if order_id is not None:
            run_query("INSERT INTO sales (order_id, total, created_at) VALUES (?,?,?)", (order_id, total, created_at))

        # generate bill file
        bill_name = f"bill_order_{order_id}.txt" if order_id else "bill_order_unknown.txt"
        with open(bill_name, "w", encoding="utf-8") as f:
            f.write("DineMaster Restaurant\n")
            f.write(f"Order ID: {order_id}\n")
            f.write(f"Table No: {table_no}\n")
            f.write(f"Date: {created_at}\n")
            f.write("-"*40 + "\n")
            f.write(f"{'Item':20}{'Qty':>5}{'Price':>10}\n")
            for nm, q, unit, price_val in items:
                f.write(f"{nm[:20]:20}{q:>5}{price_val:>10.2f}\n")
            f.write("-"*40 + "\n")
            f.write(f"{'Subtotal':>30}: {subtotal:>8.2f}\n")
            f.write(f"{'Tax':>30}: {tax_amt:>8.2f}\n")
            f.write(f"{'Total':>30}: {total:>8.2f}\n")
            f.write("\nThank you! Visit again.\n")

        messagebox.showinfo("Bill Generated", f"Order saved (ID {order_id}). Bill: {bill_name}")
        self.order_table.delete(0, tk.END)
        for i in self.cart_tree.get_children():
            self.cart_tree.delete(i)

    # ---------- Kitchen Panel ----------
    def kitchen_panel(self):
        self.clear_root()
        frame = ttk.Frame(self.root, padding=10)
        frame.pack(fill=tk.BOTH, expand=True)
        self.header(frame, "Kitchen Panel - Orders")

        self.kitchen_tree = ttk.Treeview(frame, columns=("id","table","items","total","status","created"), show="headings")
        for col,w in [("id",60),("table",80),("items",360),("total",100),("status",100),("created",160)]:
            self.kitchen_tree.heading(col, text=col.title())
            self.kitchen_tree.column(col, width=w)
        self.kitchen_tree.pack(fill=tk.BOTH, expand=True)

        ctl = ttk.Frame(frame)
        ctl.pack(fill=tk.X, pady=6)
        ttk.Button(ctl, text="Refresh", command=self.refresh_kitchen).pack(side=tk.LEFT, padx=6)
        ttk.Button(ctl, text="Mark Cooking", command=lambda: self.change_order_status("cooking")).pack(side=tk.LEFT, padx=6)
        ttk.Button(ctl, text="Mark Ready", command=lambda: self.change_order_status("ready")).pack(side=tk.LEFT, padx=6)
        ttk.Button(ctl, text="Mark Served", command=lambda: self.change_order_status("served")).pack(side=tk.LEFT, padx=6)
        ttk.Button(ctl, text="Back", command=self.build_dashboard).pack(side=tk.RIGHT, padx=6)
        self.refresh_kitchen()

    def refresh_kitchen(self):
        for i in self.kitchen_tree.get_children():
            self.kitchen_tree.delete(i)
        rows = run_query("SELECT id, table_no, items, total, status, created_at FROM orders ORDER BY created_at DESC", fetchall=True) or []
        for r in rows:
            items_desc = []
            parts = r[2].split(";") if r[2] else []
            for p in parts:
                if p:
                    try:
                        nm, qty, unit, price = p.split("|")
                        items_desc.append(f"{nm}x{qty}")
                    except ValueError:
                        pass
            self.kitchen_tree.insert('', tk.END, values=(r[0], r[1], ", ".join(items_desc), f"₹{r[3]:.2f}", r[4], r[5]))

    def change_order_status(self, new_status: str):
        sel = self.kitchen_tree.selection()
        if not sel:
            messagebox.showwarning("Select", "Select an order first.")
            return
        item = self.kitchen_tree.item(sel[0])['values']
        order_id = item[0]
        run_query("UPDATE orders SET status=? WHERE id=?", (new_status, order_id))
        messagebox.showinfo("Updated", f"Order {order_id} marked {new_status}.")
        self.refresh_kitchen()

    # ---------- Reports ----------
    def daily_sales_report(self):
        rows = run_query("SELECT id, order_id, total, created_at FROM sales WHERE date(created_at)=date('now')", fetchall=True) or []
        if not rows:
            messagebox.showinfo("Report", "No sales recorded today.")
            return
        fname = f"sales_{datetime.datetime.now().strftime('%Y%m%d')}.csv"
        with open(fname, "w", newline='', encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["id","order_id","total","created_at"])
            for r in rows:
                writer.writerow(r)
        messagebox.showinfo("Report Saved", f"Today's sales exported to {fname}")

# ---------------------------
# Boot
# ---------------------------
def main():
    init_db()
    root = tk.Tk()
    style = ttk.Style(root)
    try:
        style.theme_use('clam')
    except Exception:
        pass
    app = RMSApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
