import { Button, Modal, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/react"
import RecipeModalSkeleton from "./RecipeModalSkeleton";
import { MealDetails } from "../types";
import RecipeModalContent from "./RecipeModalContent";

type Props = {
  data: MealDetails | null;
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

function RecipeModal({ data,isOpen, onClose, loading }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          {loading ? <RecipeModalSkeleton /> : data && <RecipeModalContent data={data} />}

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RecipeModal
