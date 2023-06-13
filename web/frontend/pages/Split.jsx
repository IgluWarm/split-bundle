import { useAppBridge } from "@shopify/app-bridge-react";
import { Cart } from "@shopify/app-bridge/actions";
import { Button } from "@shopify/polaris";
import { useEffect, useState } from "react";

export default function SplitPage() {
  const appBridge = useAppBridge();
  const [lineItem, setLineItem] = useState(null);
  const cart = Cart.create(appBridge);

  useEffect(() => {
    var unsubscriber = cart.subscribe(Cart.Action.UPDATE, function (payload) {
      alert(`[Client] fetchCart - ${JSON.stringify(payload)}`);
      setLineItem(payload.data.lineItems[0]);
      unsubscriber();
    });
    cart.dispatch(Cart.Action.FETCH);
  }, []);

  const addLineItemToCart = () => {
    alert(`[Client] addLineItemToCart - ${JSON.stringify(lineItem)}`);
    const lineItemDTO = {
      price: lineItem.price,
      quantity: 4,
      title: lineItem.title,
      variantId: lineItem.variantId,
    };
    console.log(lineItemDTO);
    cart.dispatch(Cart.Action.ADD_LINE_ITEM, {
      data: lineItemDTO,
    });
  };

  return (
    <div>
      <h1>Split Page</h1>
      <Button
        size="large"
        fullWidth
        primary
        onClick={() => {
          alert("addLineItemToCart");
          addLineItemToCart();
        }}
      >
        Confirmar
      </Button>
    </div>
  );
}