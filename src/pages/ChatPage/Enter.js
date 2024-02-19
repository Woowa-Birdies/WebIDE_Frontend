import {useRef} from "react"
import {ChakraProvider,useDisclosure,Button,Input} from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import ChatRoom from './ChatRoom';
function Enter() {
    const {isOpen,onOpen,onClose } = useDisclosure();
    const btnRef = useRef();
    return (
        <ChakraProvider>
            <Button ref={btnRef} colorScheme='blackAlpha' onClick={onOpen} size='sm'>채팅방</Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>채팅방</DrawerHeader>
                    <DrawerBody>
                        <ChatRoom />
                        <Input />
                        </DrawerBody>
                    <DrawerFooter><Button colorScheme='blue' size='xs'>전송</Button></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </ChakraProvider>
    )
}
export default Enter;