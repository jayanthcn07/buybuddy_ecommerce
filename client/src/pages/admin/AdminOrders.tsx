import { useShop } from "@/context/ShopContext";
import { OrderStatus } from "@/context/ShopContext";
import { formatPrice } from "@/lib/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statuses: OrderStatus[] = ["pending", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useShop();
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Orders ({orders.length})</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground bg-card p-6 rounded-lg border border-border">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <article key={o.id} className="bg-card border border-border rounded-lg shadow-card p-4">
              <header className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <p className="font-mono font-semibold">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.userName} • {new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-price">{formatPrice(o.total)}</span>
                  <Select value={o.status} onValueChange={(v) => updateOrderStatus(o.id, v as OrderStatus)}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </header>
              <div className="text-sm text-muted-foreground">
                {o.items.length} item(s) • Ship to {o.shipping.fullName}, {o.shipping.city}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};
export default AdminOrders;
