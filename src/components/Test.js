import React, { useState } from "react";
import ReactDOM from "react-dom";
import API from "./MockAPI";
import "./Test.css";

import {
  Flex,
  Spacer,
  Box,
  Stack,
  Text,
  HStack,
  Button,
  Checkbox,
  CheckboxGroup,
  Center,
} from "@chakra-ui/react";

function Test() {
  const [cart, setCart] = useState(API);

  const addToCart = (i) => {
    setCart((prevState) =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inCart: true,
            count: item.counterVal,
            countnew: item.counterValnew,
          };
        }
        return item;
      })
    );
  };

  const increaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 9) {
            return item;
          } else return { ...item, count: item.count + 1 };
        } else if (i === o) {
          if (item.counterVal > 9) {
            return item;
          } else
            return {
              ...item,
              counterVal: item.counterVal + 1,
            };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 1) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        } else if (i === o && item.counterVal > 1) {
          return {
            ...item,
            counterVal: item.counterVal - 1,
          };
        }
        return item;
      })
    );
  };

  const increaseQuantitynew = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 9) {
            return item;
          } else return { ...item, countnew: item.countnew + 1 };
        } else if (i === o) {
          if (item.counterVal > 9) {
            return item;
          } else
            return {
              ...item,
              counterValnew: item.counterValnew + 1,
            };
        }
        return item;
      })
    );
  };

  const decreaseQuantitynew = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 1) {
            return { ...item, count: item.countnew - 1 };
          } else {
            return item;
          }
        } else if (i === o && item.counterValnew > 1) {
          return {
            ...item,
            counterValnew: item.counterValnew - 1,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            count: 0,
            counterVal: 1,
            inCart: false,
          };
        }
        return item;
      })
    );
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.count, 0);
  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const cartTotals = () =>
    cartCountTotal === 0 ? (
      <b>Cart is empty</b>
    ) : (
      <>
        {/* <b>
          <p>Items in Cart: {cartCountTotal}</p>
          <p>
            Total Price: $
            {Number.isInteger(cartPriceTotal)
              ? cartPriceTotal
              : cartPriceTotal.toFixed(2)}
          </p>
        </b> */}
      </>
    );

  const cartItems = cart.map((item, i) => (
    <React.Fragment key={item.name}>
      {item.inCart && (
        <>
          <p> Room: {item.name}</p>
          <p>
            Adults: <button onClick={() => decreaseQuantity(i)}>-</button>{" "}
            {item.count} <button onClick={() => increaseQuantity(i)}>+</button>
          </p>
          <p>
            Children: <button onClick={() => decreaseQuantitynew(i)}>-</button>{" "}
            {item.countnew}{" "}
            <button onClick={() => increaseQuantitynew(i)}>+</button>
          </p>
          {/* <p>
            Item Subtotal: $
            {Number.isInteger(item.count * item.price)
              ? item.count * item.price
              : `${(item.count * item.price).toFixed(2)}`}
          </p> */}
          <button onClick={() => removeFromCart(i)}>Remove From Cart</button>
          <hr />
        </>
      )}
    </React.Fragment>
  ));

  const cartProducts = () => (
    <Flex w="100%" justifyContent="center" gap="4">
      {cart.map((item, i) => (
        <Flex flexDirection="column" key={item.name}>
          {/* <Text textAlign="center" my="2">
            {item.name}
          </Text> */}

          <Center>
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) =>
                setCheckedItems([e.target.checked, e.target.checked])
              }
              children={item.name}
            />
          </Center>

          {!item.inCart ? (
            <Stack my="2">
              <Flex flexDirection="column" alignItems="center">
                <Text>Adults</Text>
                <HStack>
                  <HStack>
                    <Checkbox
                      isChecked={checkedItems[0]}
                      onChange={(e) =>
                        setCheckedItems([e.target.checked, checkedItems[1]])
                      }
                      children=""
                    />
                    <button onClick={() => decreaseQuantity(i)}>-</button>
                    <input readOnly type="text" value={item.counterVal} />
                  </HStack>
                  <button onClick={() => increaseQuantity(i)}>+</button>
                </HStack>
              </Flex>
              <Flex bg="green" flexDirection="column" alignItems="center">
                <Text>Children</Text>
                <HStack>
                  <HStack>
                    <Stack>
                      <Checkbox
                        isChecked={checkedItems[1]}
                        onChange={(e) =>
                          setCheckedItems([checkedItems[0], e.target.checked])
                        }
                        children=""
                      />
                    </Stack>
                    <button onClick={() => decreaseQuantitynew(i)}>-</button>
                    <input readOnly type="text" value={item.counterValnew} />
                  </HStack>

                  <button onClick={() => increaseQuantitynew(i)}>+</button>
                </HStack>
              </Flex>
              <Button onClick={() => addToCart(i)}>add</Button>
            </Stack>
          ) : (
            <p>
              <b>Item added!</b>
            </p>
          )}
        </Flex>
      ))}
    </Flex>
  );

  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <Flex
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="2"
    >
      {cartItems}
      {cartTotals()}
      {cartProducts()}
    </Flex>
  );
}

export default Test;
