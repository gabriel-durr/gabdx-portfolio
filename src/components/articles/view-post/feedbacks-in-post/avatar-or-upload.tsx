import { FeedbackHookFormType } from "./comment";

import { UseFormSetValue } from "react-hook-form";
import { UseFormHandleSubmit } from "react-hook-form";
import { TbPhotoEdit, TbPhotoX } from "react-icons/tb";
import ImageUploading, { ImageListType } from "react-images-uploading";

import { Box, Icon, Avatar, VStack, Button, useToken } from "@chakra-ui/react";

type UploadAvatarProps = {
	avatarUp: ImageListType;
	setAvatarUp(avatar: ImageListType): void;
	setValue: UseFormSetValue<FeedbackHookFormType>;
	name: string;
	avatar?: string;
	isEqualFeedbackId: boolean;
	handleSubmit: UseFormHandleSubmit<FeedbackHookFormType>;
	handleOnSubmit(data: FeedbackHookFormType): void;
};

export const AvatarOrUpload = ({
	name,
	avatar,
	avatarUp,
	setAvatarUp,
	setValue,
	handleSubmit,
	handleOnSubmit,
	isEqualFeedbackId,
}: UploadAvatarProps) => {
	const maxNumberImages = 1;

	const avatarUploaded = avatarUp[0]?.dataURL;
	const isAvatarExists = Boolean(avatarUploaded?.length);
	const originAvatarOrUp = avatarUploaded || avatar;

	const [borderLight, borderDark] = useToken("colors", [
		"light.600",
		"gray.300",
	]);

	const onChange = (avatar: ImageListType, _: any) => {
		const photoUrl = avatar[0].dataURL as string;

		setValue("avatar", photoUrl);
		setAvatarUp(avatar);
	};

	function handleRemoveAvatar() {
		setAvatarUp([]);
		setValue("avatar", "");
	}

	return (
		<VStack pos="relative" h="78px">
			<Avatar
				pos="relative"
				size="md"
				name={name}
				src={originAvatarOrUp}
				overflow="hidden"
				boxShadow="sm">
				{isEqualFeedbackId && (
					<ImageUploading
						multiple={false}
						value={avatarUp}
						onChange={onChange}
						acceptType={["jpg", "jpeg", "png"]}
						maxNumber={maxNumberImages}>
						{({ onImageUpload, dragProps }) => (
							<Box
								{...dragProps}
								pos="absolute"
								gap={2}
								zIndex={1}
								bottom={0}
								w="100%"
								h="24px"
								fontFamily="body"
								draggable={false}
								padding="2px"
								userSelect="none"
								cursor="pointer"
								transition="background .4s"
								bg="#000000b8"
								borderRadius="4%"
								whiteSpace="nowrap"
								fontSize=".44rem"
								textAlign="center"
								color={isAvatarExists ? "gbdx.orangeVibrance" : "gbdx.white"}
								onClick={
									isAvatarExists
										? () => handleRemoveAvatar()
										: () => onImageUpload()
								}
								_hover={{
									background: "#020101f1",
									fontWeight: "medium",
								}}>
								<Icon
									fontSize="md"
									as={isAvatarExists ? TbPhotoX : TbPhotoEdit}
								/>
							</Box>
						)}
					</ImageUploading>
				)}
			</Avatar>

			{isEqualFeedbackId && avatarUploaded && (
				<Button
					pos="absolute"
					bottom={0}
					variant="unstyled"
					p={0.5}
					rounded="sm"
					boxSize="max"
					color="green"
					letterSpacing="wider"
					fontWeight="bold"
					border="1px solid"
					borderColor={borderLight}
					fontFamily="body"
					fontSize="8px"
					whiteSpace="nowrap"
					textTransform="uppercase"
					_light={{ borderColor: borderDark }}
					onClick={handleSubmit(handleOnSubmit)}>
					alterar foto
				</Button>
			)}
		</VStack>
	);
};
